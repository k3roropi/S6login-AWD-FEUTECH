document.addEventListener('DOMContentLoaded', function() {

    setActiveTab('login');

    var regForm = document.getElementById('RegForm');

    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var firstName = regForm.querySelector('input[name="firstName"]').value;
            var lastName = regForm.querySelector('input[name="lastName"]').value;
            if (!firstName && !lastName){
                alert('You have not entered your name yet!')
                return;
            } else if (!firstName){
                alert('You have not entered your first name yet!')
                return;
            } else if(!lastName){
                alert('You have not entered your last name yet!')
                return;
            }

            var email = regForm.querySelector('input[name="email"]').value;
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return; 
            }

            var password = regForm.querySelector('input[name="password"]').value;
            var confirmPassword = regForm.querySelector('input[name="confirmPassword"]').value;
            if (!password){
                alert('You have not entered a password yet!')
                return;
            } else if(password.length < 8){
                alert('Your password must be at least 8 characters long!');
                return;
            } else if(!confirmPassword){
                alert('You have not confirmed the identity of your password yet!')
                return;
            } else if (password !== confirmPassword) {
                alert('The passwords do not match.');
                return; 
            } 

            var isCheckboxChecked = regForm.querySelector('#termsCheckbox').checked;
            if (!isCheckboxChecked) {
                alert('Please accept the Terms of Use & Privacy Policy to create an account.');
                return; 
            }
            
            var formData = {
                firstName: regForm.querySelector('input[name="firstName"]').value,
                lastName: regForm.querySelector('input[name="lastName"]').value,
                email: email,
                password: password, 
                confirmPassword: confirmPassword
            };

            sessionStorage.setItem('formData', JSON.stringify(formData)); 
            window.location.href = 'welcome_page.html'; 
        });
    }

    // Form validation for login
    var loginForm = document.getElementById('LoginForm');
    var errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.display = 'none';
    loginForm.appendChild(errorMessage);

    function validateLoginForm() {
        errorMessage.style.display = 'none'; 
        var storedData = JSON.parse(sessionStorage.getItem('formData'));
        
        var emailOrFirstNameInput = document.querySelector('#LoginForm input[type=text]').value.trim();
        var passwordInput = document.querySelector('#LoginForm input[type=password]').value.trim();

        if (!storedData) {
            errorMessage.textContent = 'No user data found. Please register first.';
            errorMessage.style.display = 'block';
            return false;
        }
        
        var isValid = false;
        if ((emailOrFirstNameInput === storedData.email || emailOrFirstNameInput === storedData.firstName) && passwordInput === storedData.password) {
            isValid = true; 
        }

        if (!isValid) {
            errorMessage.textContent = 'Invalid username, email, or password.';
            errorMessage.style.display = 'block'; 
            return false;
        }

        return isValid;
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            if (validateLoginForm()) {
                window.location.href = 'welcome_page.html';
            }
        });
    }
});

function setActiveTab(tab) {
    var loginTab = document.querySelector('.l');
    var signUpTab = document.querySelector('.s');

    if (tab === 'login') {
        loginTab.style.backgroundColor = '#56ab2f'; 
        loginTab.style.color = 'white'; 
        signUpTab.style.backgroundColor = 'transparent'; 
        signUpTab.style.color = 'black'; 
    } else if (tab === 'signup') {
        signUpTab.style.backgroundColor = '#56ab2f'; 
        signUpTab.style.color = 'white'; 
        loginTab.style.backgroundColor = 'transparent'; 
        loginTab.style.color = 'black'; 
    }
}

function login() {
    document.getElementById('LoginForm').style.display = 'flex'; 
    document.getElementById('RegForm').style.display = 'none';
    setActiveTab('login');
}

function register() {
    document.getElementById('LoginForm').style.display = 'none';   
    document.getElementById('RegForm').style.display = 'flex'; 
    setActiveTab('signup');
}
