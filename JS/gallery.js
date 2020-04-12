var makeBSS = function (el, options) {
    // a collection of all of the slideshow
    var slideshows = document.querySelectorAll(el), 
        // this slideshow instance
        slideshow = {},
        // the slideshow object we will use as prototype
        Slideshow = {
            init: function (el, options) {

                options = options || {}; // if options object not passed in, then set to empty object 
                options.auto = options.auto || false; // if options.auto object not passed in, then set to false
                this.opts = {
                    selector: (typeof options.selector === "undefined") ? "figure" : options.selector,
                    auto: (typeof options.auto === "undefined") ? false : options.auto,
                    speed: (typeof options.auto.speed === "undefined") ? 3000 : options.auto.speed,
                    pauseOnHover: (typeof options.auto.pauseOnHover === "undefined") ? false : options.auto.pauseOnHover,
                };
                
                this.counter = 0; // to keep track of current slide
                this.el = el; // current slideshow container element
                this.items = el.querySelectorAll(this.opts.selector); // a collection of all of the slides
                this.numItems = this.items.length; // total number of slides
                this.items[0].classList.add('bss-show'); // add show class to first figure 
                this.injectControls(el);
                this.addEventListeners(el);
                if (this.opts.auto) {
                    this.autoCycle(this.el, this.opts.speed, this.opts.pauseOnHover);
                }
                if (this.opts.swipe) {
                    this.addSwipe(this.el);
                }
            },
            showCurrent: function (i) {
                // increment or decrement this.counter depending on whether i === 1 or i === -1
                if (i > 0) {
                    this.counter = (this.counter + 1 === this.numItems) ? 0 : this.counter + 1;
                } else {
                    this.counter = (this.counter - 1 < 0) ? this.numItems - 1 : this.counter - 1;
                }

                // remove .show from whichever element currently has it 
                [].forEach.call(this.items, function (el) {
                    el.classList.remove('bss-show');
                });
  
                // add .show to the one item that's supposed to have it
                this.items[this.counter].classList.add('bss-show');
            },
            injectControls: function (el) {
            // build and inject prev/next controls
                // first create all the new elements
                var spanPrev = document.createElement("span"),
                    spanNext = document.createElement("span"),
                    docFrag = document.createDocumentFragment();
        
                // add classes
                spanPrev.classList.add('bss-prev');
                spanNext.classList.add('bss-next');
        
                // add contents
                spanPrev.innerHTML = '&laquo;';
                spanNext.innerHTML = '&raquo;';
                
                // append elements to fragment, then append fragment to DOM
                docFrag.appendChild(spanPrev);
                docFrag.appendChild(spanNext);
                el.appendChild(docFrag);
            },
            /* add event listeners to prev/next
            buttons, and to left/right arrow keys
            for keyboard navigation */
            addEventListeners: function (el) {
                var that = this;
                el.querySelector('.bss-next').addEventListener('click', function () {
                    that.showCurrent(1); // increment & show
                }, false);
            
                el.querySelector('.bss-prev').addEventListener('click', function () {
                    that.showCurrent(-1); // decrement & show
                }, false);
                
                el.onkeydown = function (e) {
                    e = e || window.event;
                    if (e.keyCode === 37) {
                        that.showCurrent(-1); // decrement & show
                    } else if (e.keyCode === 39) {
                        that.showCurrent(1); // increment & show
                    }
                };
            },
            /* make slides auto-advance on a timer
            and pause timer on hover */
            autoCycle: function (el, speed, pauseOnHover) {
                var that = this,
                    interval = window.setInterval(function () {
                        that.showCurrent(1); // increment & show
                    }, speed);
                
                if (pauseOnHover) {
                    el.addEventListener('mouseover', function () {
                        clearInterval(interval);
                        interval = null;
                    }, false);
                    el.addEventListener('mouseout', function () {
                        if(!interval) {
                            interval = window.setInterval(function () {
                                that.showCurrent(1); // increment & show
                            }, speed);
                        }
                    }, false);
                }
                
            },
        };
        
    // make instances of Slideshow as needed
    [].forEach.call(slideshows, function (el) {
        slideshow = Object.create(Slideshow);
        slideshow.init(el, options);
    });
};