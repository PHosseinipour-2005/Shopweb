document.addEventListener("DOMContentLoaded", function(event){
    
   const form = document.getElementById("signupForm");
   const emailInput = document.getElementById("email");
    

   if(!form || !emailInput){
    console.error("emai is not found");
    return;
   }

   form.addEventListener("submit" , function(event){
    event.preventDefault();

     const email = emailInput.value ? emailInput.value.trim() : "";
     const emailpattern = /^[a-z\-ZO\-9._%+-]+@[a-zA\-ZO\-9.-]+\.[a-zA\-Z]{2,6}$/;
      if(!emailpattern.test(email)){
        alert(" Sorry! your email is incorrect.");
        return;
      }
     
      alert("your massege was send.");
      form.submit();
   });


});