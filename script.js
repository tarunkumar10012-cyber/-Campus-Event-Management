let seats = [30, 25, 40];
let totalRegistrations = 0;
let registrations = [];

// Register for an event
function registerEvent(id) {
  if (seats[id - 1] > 0) {
    document.getElementById("eventChoice").value = id;

    document.querySelector(".registration").scrollIntoView({
      behavior: "smooth",
    });

    document.getElementById("studentName").focus();
  } else {
    alert("Sorry! No seats available.");
  }
}

// Submit Registration Form
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("studentName").value;
    let email = document.getElementById("studentEmail").value;
    let studentId = document.getElementById("studentId").value;
    let eventId = Number(document.getElementById("eventChoice").value);

    if (!eventId) {
      alert("Please select an event.");
      return;
    }

    // Check duplicate registration
    let duplicate = registrations.some(function (reg) {
      return (
        reg.eventId === eventId &&
        (reg.email === email || reg.studentId === studentId)
      );
    });

    if (duplicate) {
      alert("You have already registered for this event.");
      return;
    }

    // Check available seats
    if (seats[eventId - 1] > 0) {
      seats[eventId - 1]--;

      totalRegistrations++;

      let confirmationId = "CE" + Date.now();

      registrations.push({
        name: name,
        email: email,
        studentId: studentId,
        eventId: eventId,
      });

      // Update seat count
      document.getElementById("seat" + eventId).innerText = seats[eventId - 1];

      // Update Admin Dashboard
      document.getElementById("adminSeat" + eventId).innerText =
        seats[eventId - 1];

      document.getElementById("total").innerText = totalRegistrations;

      // Show confirmation
      document.getElementById("message").innerHTML =
        "Registration Successful!<br>" +
        "Welcome " +
        name +
        "<br>" +
        "Confirmation ID: " +
        confirmationId +
        "<br><button onclick='window.print()'>Print Confirmation</button>";

      document.getElementById("registrationForm").reset();

      alert("Your registration is successful!");
    } else {
      alert("Sorry! This event is fully booked.");
    }
  });

// Search Events
function searchEvents() {
  let search = document.getElementById("search").value.toLowerCase();

  let cards = document.getElementsByClassName("event-card");

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].getElementsByTagName("h2")[0].innerText.toLowerCase();

    if (title.includes(search)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Show Admin Dashboard
function showAdmin() {
  document.getElementById("admin").style.display = "block";

  document.getElementById("admin").scrollIntoView({
    behavior: "smooth",
  });
}

// Hide Admin Dashboard
function hideAdmin() {
  document.getElementById("admin").style.display = "none";
}
