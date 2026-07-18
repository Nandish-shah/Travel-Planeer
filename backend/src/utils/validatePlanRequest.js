const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetweenInclusive(startISO, endISO) {
  const start = new Date(`${startISO}T00:00:00Z`);
  const end = new Date(`${endISO}T00:00:00Z`);
  return Math.round((end - start) / MS_PER_DAY) + 1;
}

export function validatePlanRequest(body) {
  const errors = [];
  const { budget, startDate, endDate, interests, origin, destination, currency, travelers } =
    body || {};

  let days = null;
  if (!startDate || !DATE_RE.test(startDate) || !endDate || !DATE_RE.test(endDate)) {
    errors.push("startDate and endDate are required in YYYY-MM-DD format.");
  } else if (Number.isNaN(new Date(startDate).getTime()) || Number.isNaN(new Date(endDate).getTime())) {
    errors.push("startDate or endDate is not a valid date.");
  } else if (endDate < startDate) {
    errors.push("endDate must be on or after startDate.");
  } else {
    days = daysBetweenInclusive(startDate, endDate);
    if (days < 1 || days > 30) {
      errors.push("Trip length must be between 1 and 30 days.");
    }
  }

  const numBudget = Number(budget);
  if (!budget || Number.isNaN(numBudget) || numBudget <= 0) {
    errors.push("budget must be a positive number.");
  }

  if (!interests || (Array.isArray(interests) && interests.length === 0)) {
    errors.push("interests must include at least one item.");
  }

  if (destination !== undefined && typeof destination !== "string") {
    errors.push("destination must be a string.");
  }

  if (origin !== undefined && typeof origin !== "string") {
    errors.push("origin must be a string.");
  }

  const numTravelers = travelers ? Number(travelers) : 1;
  if (Number.isNaN(numTravelers) || numTravelers < 1 || numTravelers > 20) {
    errors.push("travelers must be a number between 1 and 20.");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      origin: origin ? String(origin).trim() : "",
      destination: destination ? String(destination).trim() : "",
      budget: numBudget,
      currency: currency ? String(currency).trim() : "USD",
      startDate,
      endDate,
      days,
      travelers: Math.round(numTravelers),
      interests: Array.isArray(interests)
        ? interests.join(", ")
        : String(interests).trim(),
    },
  };
}
