$(function(){
   var $body = $('body')
   var $nav = $('.navbar')
   var $intro = $('.intro')
   var $features = $('.features')
   var $about = $('.about')
   var $projects = $('.projects')
   var $skills = $('.skills')
   var $headerButton = $('.button-header')
   var $learnButton = $('.button-learn')
   var $enterButton = $('.button-enter')
   var $featuresButton = $('.button-features')
   var $aboutButton = $('.button-about')
   var $projectsButton = $('.button-projects')
   var $skillsButton = $('.button-skills')
   var $aboutLink = $('#about-link')
   var $projectsLink = $('#projects-link')
   var $skillsLink = $('#skills-link')
   var $contactForm = $('#contact-form')

   var scrollToIntro = scrollTo.bind(this, $body, $intro.offset().top)
   var scrollToFeatures = scrollTo.bind(this, $body, $features.offset().top)
   var scrollToAbout = scrollTo.bind(this, $body, $about.offset().top)
   var scrollToProjects = scrollTo.bind(this, $body, $projects.offset().top)
   var scrollToSkills = scrollTo.bind(this, $body, $skills.offset().top)
   var scrollToTop = scrollTo.bind(this, $body, 50)

   $aboutLink.click(scrollToAbout)
   $projectsLink.click(scrollToProjects)
   $skillsLink.click(scrollToSkills)
   $learnButton.click(scrollToIntro)
   $enterButton.click(scrollToIntro)
   $featuresButton.click(scrollToFeatures)
   $aboutButton.click(scrollToAbout)
   $projectsButton.click(scrollToProjects)
   $skillsButton.click(scrollToSkills)
   $headerButton.click(scrollToTop)
   $(document).scroll(changeNavClass)
   $contactForm.submit(postForm)

   function isScrolledIntoView(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
   }
   function changeNavClass() {
      var scroll = $body.scrollTop()
      if (!$nav.hasClass('fixed')) {
         $nav.addClass('fixed')
      } else if (scroll === 0) {
         $nav.removeClass('fixed')
      }
   }
   function scrollTo($el, height) {
      height -= 50
      $el.animate({
         scrollTop: height
      }, 500)  
   }

   function postForm(e) {
      e.preventDefault()
      var $contactForm = $('.contact-form-container')
      var $contactSending = $('.contact-sending-container')
      var $contactThanks = $('.contact-thanks-container')
      $contactForm.addClass('hidden')
      $contactSending.removeClass('hidden')
      var firstName = $('input[name="first-name"]').val()
      var lastName = $('input[name="last-name"]').val()
      var organization = $('input[name="organization"]').val()
      var phone = $('input[name="phone"]').val()
      var email = $('input[name="email"]').val()
      var message = $('textarea[name="message"]').val()
      var contact = {
         firstName: firstName,
         lastName: lastName,
         organization: organization,
         phone: phone,
         email: email,
         message: message
      }
      $.ajax({
         url: 'http://localhost:4001/contact', 
         method: 'POST',
         data: JSON.stringify(contact), 
         contentType: 'application/json'
      })
      .done(function(data) {
         console.log(data)
         $contactSending.addClass('hidden')
         $contactThanks.removeClass('hidden')
      })
      .fail(function(err) {
         console.error(err)
         $contactSending.addClass('hidden')
         $contactForm.removeClass('hidden')
         $contactForm.children('.error').removeClass('hidden')
      })
   }
})


function changeClassOnScroll($el, className, $scrollEl, height) {
   if (!$el.hasClass(className)) {
      $el.addClass(className)
   } else if ($scrollEl.scrollTop() === 0) {
      $el.removeClass(className)
   }
} 
