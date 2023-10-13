// polyfill for `position: sticky;`
(function () {
  var stickyElements = document.getElementsByClassName('sticky');

  for (var i = stickyElements.length - 1; i >= 0; i--) {
    Stickyfill.add(stickyElements[i]);
  }
})();

// from http://stackoverflow.com/questions/14804941/how-to-add-smooth-scrolling-to-bootstraps-scroll-spy-function
(function () {
  document.querySelectorAll(".nav a.nav-link[href^='#']")
    .forEach(function (element) {
      var target = element.href.replace(/.*#/, '#');
      var navsize = document.querySelector('#navbar').offsetHeight;

      element.addEventListener('click', function(e) {
        e.preventDefault();

        function updateWindowHash() {
          window.location.hash = target;
        }

        $('html, body').animate(
          { scrollTop: document.querySelector(target).getBoundingClientRect().top + window.scrollY - navsize},
          468,
          updateWindowHash
        );
      });
    });
})();
