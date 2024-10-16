// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbTsqLQzR3XiqnOuf2lp0EgUfffNJz9YM",
    authDomain: "videoconnect-a3dfc.firebaseapp.com",
    databaseURL: "https://videoconnect-a3dfc-default-rtdb.firebaseio.com",
    projectId: "videoconnect-a3dfc",
    storageBucket: "videoconnect-a3dfc.appspot.com",
    messagingSenderId: "354750925913",
    appId: "1:354750925913:web:4d8ea3b1eae818165b3548"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const adminEmail = "mailbox@gmail.com";
const adminPassword = "admin";

// Get elements
const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('login');
const inboxContainer = document.getElementById('inbox');
const loginError = document.getElementById('loginError');
const submissionList = document.getElementById('submissionList');

// Check for existing login
if (localStorage.getItem('isLoggedIn') === 'true') {
    loginContainer.style.display = 'none';
    inboxContainer.style.display = 'block';
    loadSubmissions();
}

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === adminEmail && password === adminPassword) {
        localStorage.setItem('isLoggedIn', 'true'); // Save login state
        loginContainer.style.display = 'none';
        inboxContainer.style.display = 'block';
        loadSubmissions();
    } else {
        loginError.textContent = 'Invalid email or password';
    }
});

function loadSubmissions() {
    db.ref("contacts").on("value", (snapshot) => { // Change this line to match your path
        submissionList.innerHTML = ''; // Clear previous entries
        const submissions = snapshot.val();
        
        console.log("Fetched submissions:", submissions); // Log fetched submissions

        if (submissions) { // Check if submissions exist
            for (let key in submissions) {
                const submission = submissions[key];
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${submission.name}</td>
                    <td>${submission.email}</td>
                    <td>${submission.contact}</td>
                    <td>${submission.message}</td>
                `;
                
                submissionList.appendChild(row);
            }
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" style="text-align: center;">No submissions found</td>`;
            submissionList.appendChild(row);
        }
    }, (error) => {
        console.error("Error fetching data: ", error);
    });
}

// Logout button
const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    window.location.reload(); // Reload the page to show the login form
});
