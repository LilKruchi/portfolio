'use strict'


console.log('Starting up')


$(onInit)

function onInit() {
    renderPortItem()
    renderPortModal()
}

function onFormInput(ev) {
    ev.preventDefault()
    
    var email = $('#email-input').val()
    var subject = $('#subject-input').val()
    var msg = $('#text').val()

    if (email || subject || msg) {
        window.open(`https://mail.google.com/mail/
                    ?view=cm&fs=1&to=lironkruch@gmail.com&su=${subject}&body=${msg}`)
    }
}

function renderPortItem() {
	var portfolioGrid = $('.portfolio-display')

	var strHTMLs = getProjects().map(project => 
	`
    <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${project.id}">
        <div class="portfolio-hover">
        <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
        </div>
    </div>
        <img class="img-fluid" src="img/portfolio/${project.id}-thumbnail.jpg" alt="">
    </a>
        <div class="portfolio-caption">
            <h4>${project.name}</h4>
            <p class="text-muted">${project.lables[0][0]}</p>
        </div>
    </div>
    `
	)
	portfolioGrid.html(strHTMLs)
}

function renderPortModal() {
    var modalContainer = $('.portfolio-modal-container')

    var strHTMLs = getProjects().map(project => {
        return `
        <div class="portfolio-modal modal fade" id="portfolioModal${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${project.title}</h2>
                    <p class="item-intro text-muted">${project.lables[0][1]}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/${project.id}-full.jpg" alt="">
                    <p>${project.desc}</p>
                    <ul class="list-inline">
                        <li>Link to project: <a href="${project.url}" target="_blank">${project.name}</a></li>
                        <li>Date: ${millsecToDate(project.publishedAt)}</li>
                        <li>Client: Threads</li>
                        <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
    })
    
    modalContainer.html(strHTMLs)
}