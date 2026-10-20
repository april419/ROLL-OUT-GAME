(function () {
  const $ = (id) => document.getElementById(id);
  const store = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch (error) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
    },
    del(key) {
      try { localStorage.removeItem(key); } catch (error) {}
    }
  };

  const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const KIND = {
    solo: ["t-solo", "Solo hobby"],
    people: ["t-people", "With people"],
    city: ["t-city", "Explore your city"],
    restaurant: ["t-city", "Restaurant"]
  };

  let user = null;
  let filter = "any";
  let current = null;
  let modalTrigger = null;

  window.CITYLIST.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    $("city").appendChild(option);
  });

  const validationRules = {
    fname: { test: (value) => value.length >= 2, message: "Enter a first name with at least 2 letters." },
    age: { test: (value) => Number.isFinite(Number(value)) && Number(value) >= 18 && Number(value) <= 120, message: "You must be 18 or older to create an account." },
    email: { test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value), message: "Enter a valid email address, like name@example.com." },
    password: { test: (value) => value.length >= 8 && /\d/.test(value), message: "Use at least 8 characters, including one number." },
    phone: { test: (value) => value.replace(/\D/g, "").length === 10 || (value.replace(/\D/g, "").length === 11 && value.replace(/\D/g, "").startsWith("1")), message: "Enter a valid 10-digit phone number." },
    city: { test: (value) => value !== "", message: "Choose the city you want ideas for." }
  };

  function setErr(id, message) {
    const input = $(id);
    const error = $("e-" + id);
    error.textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    input.classList.toggle("invalid", Boolean(message));
  }

  Object.keys(validationRules).forEach((id) => {
    const field = $(id);
    const validate = () => {
      const value = id === "phone" ? field.value.replace(/\D/g, "") : field.value.trim();
      const rule = validationRules[id];
      setErr(id, rule.test(value) ? "" : rule.message);
    };
    field.addEventListener("input", validate);
    field.addEventListener("blur", validate);
  });

  $("pwToggle").onclick = () => {
    const password = $("password");
    const visible = password.type === "password";
    password.type = visible ? "text" : "password";
    $("pwToggle").textContent = visible ? "Hide" : "Show";
    $("pwToggle").setAttribute("aria-label", visible ? "Hide password" : "Show password");
  };

  $("signup").addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    Object.entries(validationRules).forEach(([id, rule]) => {
      const value = id === "phone" ? $(id).value.replace(/\D/g, "") : $(id).value.trim();
      const fieldValid = rule.test(value);
      setErr(id, fieldValid ? "" : rule.message);
      valid = valid && fieldValid;
    });
    if (!valid) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const savedUser = {
      first_name: $("fname").value.trim(),
      age: Number($("age").value),
      email: $("email").value.trim(),
      phone: $("phone").value.replace(/\D/g, ""),
      city: $("city").value
    };
    store.set("ro_user", savedUser);
    enter(savedUser, true);
  });

  function cityPool() {
    const cityName = user.city === "Other city" ? "your city" : user.city;
    const general = window.ANYCITY.map((idea) => ({
      ...idea,
      t: idea.t.replaceAll("{c}", cityName),
      s: idea.s.replaceAll("{c}", cityName)
    }));
    return (window.CITIES[user.city] || []).concat(general);
  }

  function getCityRestaurant(city) {
    const restaurants = window.RESTAURANTS[city] || window.RESTAURANTS["Other city"] || [];
    return restaurants.length ? pick(restaurants) : null;
  }

  function getActivityPlace(kind, city) {
    const places = window.ACTIVITY_PLACES[kind] || window.ACTIVITY_PLACES.city || [];
    return pick(places) || { name: "Local activity", location: city, tags: [] };
  }

  function buildDieFaces() {
    document.querySelectorAll(".die-face").forEach((dieFace) => {
      const number = Number(dieFace.dataset.face);
      dieFace.innerHTML = Array.from({ length: 9 }, (_, index) => {
        const isPip = window.PIPS[number].includes(index);
        return `<i${isPip ? ' class="on"' : ""}></i>`;
      }).join("");
    });
  }

  function face(number) {
    const orientations = {
      1: "rotateX(90deg)",
      2: "rotateX(0deg)",
      3: "rotateZ(-90deg)",
      4: "rotateZ(90deg)",
      5: "rotateX(180deg)",
      6: "rotateX(-90deg)"
    };
    $("dieCube").style.setProperty("--die-landing", orientations[number]);
  }

  function addRecentRoll(entry) {
    const recent = store.get("ro_recent", []);
    store.set("ro_recent", [
      { ...entry, id: String(Date.now()) },
      ...recent.filter((item) => !(item.title === entry.title && item.kind === entry.kind))
    ].slice(0, 5));
    renderRecent();
  }

  function renderRecent() {
    const element = $("recent");
    const recent = store.get("ro_recent", []);
    if (!recent.length) {
      element.innerHTML = '<p class="empty">Your recent rolls will show up here.</p>';
      return;
    }
    element.innerHTML = recent.map((item) => {
      const kind = KIND[item.kind] || KIND.city;
      return `<article class="recent-card"><span class="tag ${kind[0]}"><b></b>${kind[1]}</span><h4>${esc(item.title)}</h4><p>${esc(item.first_step || "")}</p></article>`;
    }).join("");
  }

  function renderPlaceCards(place, restaurant) {
    const city = user && user.city !== "Other city" ? user.city : "";
    const activityQuery = `${place.name} ${place.location} ${city}`.trim();
    const samePlace = restaurant && place.name === restaurant.name && place.location === restaurant.location;
    const activityCard = samePlace ? "" : `
      <div class="place-box">
        <strong>Where to go</strong>
        <div class="place-headline"><div><p class="place-name">${esc(place.name)}</p><p class="place-meta">${esc(place.location)}</p></div></div>
        <div class="tag-row">${(place.tags || []).slice(0, 3).map((tag) => `<span class="mini-tag">${esc(tag)}</span>`).join("")}</div>
        <div class="map-links">
          <a href="${window.buildMapsUrl(activityQuery, "apple")}" target="_blank" rel="noopener noreferrer">Apple Maps</a>
          <a href="${window.buildMapsUrl(activityQuery, "google")}" target="_blank" rel="noopener noreferrer">Google Maps</a>
        </div>
      </div>`;
    const restaurantCard = restaurant ? `
      <div class="place-box restaurant-box">
        <strong>Restaurant suggestion</strong>
        <div class="place-headline"><div><p class="place-name">${esc(restaurant.name)}</p><p class="place-meta">${esc(city || "Local suggestion")}</p></div></div>
        <div class="tag-row">${(restaurant.cuisines || []).slice(0, 3).map((tag) => `<span class="mini-tag">${esc(tag)}</span>`).join("")}</div>
        <div class="map-links">
          <a href="${window.buildMapsUrl(`${restaurant.name} ${city}`.trim(), "apple")}" target="_blank" rel="noopener noreferrer">Apple Maps</a>
          <a href="${window.buildMapsUrl(`${restaurant.name} ${city}`.trim(), "google")}" target="_blank" rel="noopener noreferrer">Google Maps</a>
          ${restaurant.reservation ? `<button type="button" class="reserve-button" data-reservation="${esc(restaurant.reservation)}" data-name="${esc(restaurant.name)}">Reserve now</button>` : '<button type="button" class="reserve-button disabled" disabled>Reservation unavailable</button>'}
        </div>
      </div>` : "";
    return activityCard + restaurantCard;
  }

  function updateBookingSummary() {
    const dateValue = $("bookingDate").value;
    const date = dateValue
      ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(`${dateValue}T12:00:00`))
      : "a date you choose";
    const guests = $("bookingParty").value;
    $("bookingText").textContent = `For ${guests} ${guests === "1" ? "guest" : "guests"} on ${date} at ${$("bookingTime").value}. Confirm availability and complete your reservation on the provider's site.`;
  }

  function openBookingModal(button) {
    modalTrigger = button;
    const date = new Date();
    $("bookingDate").min = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
    $("bookingDate").value = $("bookingDate").min;
    $("bookingTitle").textContent = `${button.dataset.name} reservation`;
    $("reserveLink").href = button.dataset.reservation;
    $("bookingModal").classList.remove("hidden");
    $("bookingModal").setAttribute("aria-hidden", "false");
    updateBookingSummary();
    $("bookingDate").focus();
  }

  function closeBookingModal() {
    $("bookingModal").classList.add("hidden");
    $("bookingModal").setAttribute("aria-hidden", "true");
    if (modalTrigger && modalTrigger.isConnected) modalTrigger.focus();
    modalTrigger = null;
  }

  function show(number) {
    const idea = current;
    const kind = KIND[idea.kind] || KIND.city;
    $("faceText").textContent = idea.kind === "restaurant" ? "Restaurant pick" : `You rolled a ${number}`;
    $("idea").innerHTML = `
      <span class="tag ${kind[0]}"><b></b>${kind[1]}</span>
      <h2>${esc(idea.t)}</h2>
      <div class="meta"><span>${esc(idea.cost)}</span><span>${esc(idea.time)}</span></div>
      <p class="step"><strong>Your first step</strong>${esc(idea.s)}</p>
      ${renderPlaceCards(idea.place, idea.restaurant)}
      <div class="affirm"><span class="label">Your affirmation</span>${esc(idea.affirm)}</div>
      <div class="actions"><button class="btn" id="keepBtn">Keep this one</button><button class="btn ghost" id="again">Roll again</button></div>`;

    $("idea").querySelectorAll("[data-reservation]").forEach((button) => {
      button.addEventListener("click", () => openBookingModal(button));
    });
    $("keepBtn").onclick = () => {
      const keeps = store.get("ro_keep", []);
      if (!keeps.some((item) => item.title === idea.t)) {
        keeps.unshift({ id: String(Date.now()), title: idea.t, first_step: idea.s, kind: idea.kind, affirmation: idea.affirm, place: idea.place, restaurant: idea.restaurant });
        store.set("ro_keep", keeps);
      }
      $("keepBtn").textContent = "Kept";
      renderKeep();
    };
    $("again").onclick = () => roll(false);
  }

  function renderKeep() {
    const element = $("keep");
    const keeps = store.get("ro_keep", []);
    if (!keeps.length) {
      element.innerHTML = '<p class="empty">Tap "Keep this one" on any roll to save it here for later.</p>';
      element.style.display = "block";
      return;
    }
    element.style.display = "";
    element.innerHTML = keeps.map((item) => {
      const kind = KIND[item.kind] || KIND.city;
      return `<article><span class="tag ${kind[0]}"><b></b>${kind[1]}</span><h4>${esc(item.title)}</h4><p class="fine">${esc(item.first_step || "")}</p>${item.restaurant ? `<p class="fine">${esc(item.restaurant.name)} · ${esc(item.restaurant.location)}</p>` : ""}<button data-id="${esc(item.id)}">Remove</button></article>`;
    }).join("");
    element.querySelectorAll("button[data-id]").forEach((button) => {
      button.onclick = () => {
        store.set("ro_keep", store.get("ro_keep", []).filter((item) => item.id !== button.dataset.id));
        renderKeep();
      };
    });
  }

  function roll(quiet) {
    if (filter === "restaurant") {
      const restaurants = window.RESTAURANTS[user.city] || window.RESTAURANTS["Other city"] || [];
      let restaurant = getCityRestaurant(user.city) || { name: "Neighborhood favorite", location: user.city, reservation: "", cuisines: ["Local favorite"] };
      const previousName = current && current.restaurant && current.restaurant.name;
      if (restaurants.length > 1 && previousName === restaurant.name) {
        restaurant = pick(restaurants.filter((item) => item.name !== previousName));
      }
      current = { t: restaurant.name, s: "Choose a time, check availability, and enjoy a meal out.", cost: "Varies", time: "1-2 hours", kind: "restaurant", affirm: pick(window.AFFIRM), place: { name: restaurant.name, location: restaurant.location, tags: restaurant.cuisines || [] }, restaurant };
      addRecentRoll({ title: current.t, kind: current.kind, first_step: current.s });
      face(6);
      show(6);
      return;
    }

    const ranges = { solo: [1, 2], people: [3, 4], city: [5, 6] };
    const number = filter === "any" ? 1 + Math.floor(Math.random() * 6) : pick(ranges[filter]);
    const kind = number <= 2 ? "solo" : number <= 4 ? "people" : "city";
    const pool = kind === "solo" ? window.SOLO : kind === "people" ? window.PEOPLE : cityPool();
    let idea = pick(pool);
    if (current && pool.length > 1) while (idea.t === current.t) idea = pick(pool);
    current = { ...idea, kind, affirm: pick(window.AFFIRM), place: getActivityPlace(kind, user.city), restaurant: getCityRestaurant(user.city) };
    addRecentRoll({ title: current.t, kind: current.kind, first_step: current.s });

    if (quiet || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      face(number);
      show(number);
      return;
    }
    const die = $("die");
    const cube = $("dieCube");
    face(number);
    cube.classList.remove("rolling");
    void cube.offsetWidth;
    cube.classList.add("rolling");
    let ticks = 0;
    const timer = setInterval(() => {
      if (++ticks > 10) {
        clearInterval(timer);
        show(number);
      }
    }, 80);
  }

  function enter(savedUser, fresh) {
    user = savedUser;
    $("authView").hidden = true;
    $("appView").hidden = false;
    $("hi").textContent = "Hey " + user.first_name;
    $("cityLine").textContent = user.city === "Other city" ? "Ideas for wherever you are" : "Ideas for " + user.city;
    $("topRight").innerHTML = '<button class="btn ghost small" id="out">Sign out</button>';
    $("out").onclick = () => {
      store.del("ro_user");
      location.reload();
    };
    renderKeep();
    renderRecent();
    roll(!fresh);
  }

  $("roll").onclick = () => roll(false);
  document.querySelectorAll(".filters button").forEach((button) => {
    button.onclick = () => {
      filter = button.dataset.f;
      document.querySelectorAll(".filters button").forEach((item) => item.setAttribute("aria-pressed", item === button ? "true" : "false"));
      roll(false);
    };
  });

  ["bookingDate", "bookingTime", "bookingParty"].forEach((id) => $(id).addEventListener("change", updateBookingSummary));
  $("closeModal").addEventListener("click", closeBookingModal);
  $("cancelReserve").addEventListener("click", closeBookingModal);
  $("bookingModal").addEventListener("click", (event) => {
    if (event.target === $("bookingModal")) closeBookingModal();
  });
  $("bookingModal").addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeBookingModal();
    } else if (event.key === "Tab") {
      const focusable = [...$("bookingModal").querySelectorAll("button:not([disabled]), a[href], input, select")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  buildDieFaces();
  face(5);
  const savedUser = store.get("ro_user", null);
  if (savedUser) enter(savedUser, false);
})();
