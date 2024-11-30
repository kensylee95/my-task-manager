function generateUserID() {
    const fullName = document.getElementById('full_name').value;

    if (fullName) {
        const initials = fullName
            .split(' ')              
            .map(word => word.charAt(0).toUpperCase()) 
            .join('');  

        const currentYear = new Date().getFullYear();
        const yearSuffix = currentYear.toString().slice(-2); 
        const randomNumber = Math.floor(Math.random() * 9000) + 1000; 
        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const userID = `${yearSuffix}${initials}${randomNumber}${randomLetter}`;

        document.getElementById('user_id').value = userID;
    }
}

document.getElementById('full_name').addEventListener('input', generateUserID);
