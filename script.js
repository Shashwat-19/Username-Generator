// Sample username generation function (replace with your actual logic)
    function generateUsername(fullName) {
      if (!fullName || fullName.trim().length === 0) {
        throw new Error("Please enter a valid name");
      }

      
      const names = fullName.trim().toLowerCase().split(' ');
      if (names.length < 2) {
        throw new Error("Please enter both first and last name");
      }
      
      const firstName = names[0];
      const lastName = names[names.length - 1];
      
      // Simple username generation logic
      const variations = [
        firstName + lastName + Math.floor(Math.random() * 100),
        firstName.charAt(0) + lastName + Math.floor(Math.random() * 1000),
        firstName + lastName.charAt(0) + Math.floor(Math.random() * 100),
        firstName + '_' + lastName,
        lastName + firstName.charAt(0) + Math.floor(Math.random() * 100)
      ];
      
      return '@' + variations[Math.floor(Math.random() * variations.length)];
    }

    function handleUsername() {
      const nameInput = document.getElementById("fullName");
      const resultDiv = document.getElementById("result");
      const generateBtn = document.getElementById("generateBtn");
      
      const name = nameInput.value;
      
      // Add generating animation
      generateBtn.classList.add("generating");
      generateBtn.textContent = "Generating...";
      resultDiv.classList.remove("show");
      
      // Simulate processing time for better UX
      setTimeout(() => {
        try {
          const username = generateUsername(name);
          resultDiv.innerHTML = `
            Your username: <strong>${username}</strong>
            <button class="copy-btn" onclick="copyToClipboard('${username}')">Copy</button>
          `;
          resultDiv.classList.remove("error");
          resultDiv.classList.add("show");
        } catch (err) {
          resultDiv.innerHTML = err.message;
          resultDiv.classList.add("error");
          resultDiv.classList.add("show");
        }
        
        // Reset button
        generateBtn.classList.remove("generating");
        generateBtn.textContent = "Generate Username";
      }, 800);
    }

    function copyToClipboard(text, event) {
    navigator.clipboard.writeText(text).then(() => {
    const copyBtn = event.target;
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "rgba(76, 175, 80, 0.3)";
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = "rgba(255, 255, 255, 0.2)";
    }, 1500);
  });
}


    // Allow Enter key to generate username
    document.getElementById("fullName").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        handleUsername();
      }
    });

    // Auto-focus on input when page loads
    window.addEventListener("load", function() {
      document.getElementById("fullName").focus();
    });