document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // फॉर्म डेटा एकत्र करें
    const formData = {
        name: document.getElementById('username').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        program: document.getElementById('program').value,
        message: document.getElementById('message').value
    };
    
    // ईमेल भेजें
    sendEmail(formData);
});

function sendEmail(formData) {
    // SMTPJS का उपयोग करके ईमेल भेजना
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "somarammegwal1@gmail.com", // आपका ईमेल
        Password: "3B8EB68E3CC7B5165635282D9D27AE4F74A6", // SMTP पासवर्ड (Elastic Email से)
        To: 'somarammegwal1@gmail.com', // आपका ईमेल
        From: "somarammegwal1@gmail.com", // आपका ईमेल
        Subject: "नया फोटोग्राफी ऑर्डर",
        Body: `
            <h2>नया फोटोग्राफी ऑर्डर विवरण</h2>
            <p><strong>नाम:</strong> ${formData.name}</p>
            <p><strong>मोबाइल:</strong> ${formData.mobile}</p>
            <p><strong>ईमेल:</strong> ${formData.email}</p>
            <p><strong>तारीख:</strong> ${formData.date}</p>
            <p><strong>इवेंट प्रकार:</strong> ${formData.program}</p>
            <p><strong>अतिरिक्त जानकारी:</strong> ${formData.message}</p>
        `
    }).then(
        message => {
            // सफलता संदेश दिखाएं
            document.getElementById('successMessage').innerHTML = 
                "आपका ऑर्डर सफलतापूर्वक जमा हो गया है! हम जल्द ही आपसे संपर्क करेंगे।";
            document.getElementById('successMessage').style.display = 'block';
            
            // फॉर्म रीसेट करें
            document.getElementById('orderForm').reset();
            
            // 5 सेकंड बाद संदेश हटाएं
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        }
    ).catch(
        error => {
            console.error("ईमेल भेजने में त्रुटि:", error);
            alert("ऑर्डर सबमिट करते समय त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।");
        }
    );
}