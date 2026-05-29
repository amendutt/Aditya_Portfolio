// Intro Screen

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.intro-logo');

window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx+1)*150)
        });

        setTimeout(()=>{
            logoSpan.forEach((span,idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx+1)*50)
            })
        },2000)

        setTimeout(()=>{
            intro.style.top='-100vh';
        },2300)
    })
})

// Scroll to top upon reload

window.onload = function() {
    window.scrollTo(0, 0);
};

// Hamburger navbar

function togglemenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");

    // If the menu is open, add a click event listener to the document
    if (menu.classList.contains("open")) {
        document.addEventListener("click", closeMenuOnClickOutside);
    } else {
        document.removeEventListener("click", closeMenuOnClickOutside);
    }
}

function closeMenuOnClickOutside(event) {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    // Check if the click is outside the menu and the hamburger icon
    if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.classList.remove("open");
        icon.classList.remove("open");
        
        // Remove the event listener after closing the menu
        document.removeEventListener("click", closeMenuOnClickOutside);
    }
}


// Into fade-blur transition

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        } 
    });
});

const hiddenElements = document.querySelectorAll('.section__text');
hiddenElements.forEach((el)=>observer.observe(el));

// Navbar turns black on scroll

// function changeBG() {
//     var navbar = document.getElementById('desktop-nav');
//     var scrollValue = window.scrollY;
//     if(scrollValue < 25) {
//         navbar.classList.remove('bgcolor')
//     } else {
//         navbar.classList.add('bgcolor')
//     }
// }

// window.addEventListener('scroll', changeBG)


// ==========================================
// TABS SWITCHING LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tabContainers = document.querySelectorAll('.tab-container');
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const tabType = button.getAttribute('data-tab');
                const targetId = button.getAttribute('data-target');
                
                // Update active tab button
                buttons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                // Switch grid content
                const section = document.getElementById(targetId);
                if (section) {
                    const contents = section.querySelectorAll('.tab-content');
                    contents.forEach(content => {
                        if (content.id === `${targetId}-${tabType}`) {
                            content.style.display = 'grid';
                            // Force reflow for fade transition
                            content.offsetHeight;
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                            content.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // ==========================================
    // INLINE VIDEO HOVER-PLAY PREVIEW
    // ==========================================
    const workVideos = document.querySelectorAll('.work video');
    workVideos.forEach(video => {
        const parent = video.closest('.work');
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                // Autoplay silent low-resource loop preview on hover
                video.play().catch(err => {
                    // Fail silently if browser blocks play
                    console.log('Hover video play blocked/interrupted:', err);
                });
            });
            parent.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Reset video to beginning
            });
        }
    });

    // ==========================================
    // UNIFIED PORTFOLIO LIGHTBOX MODAL
    // ==========================================
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxVideo && lightboxCaption && lightboxClose) {
        const workItems = document.querySelectorAll('.work');
        
        workItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const src = item.getAttribute('data-src');
                const type = item.getAttribute('data-type');
                const title = item.getAttribute('data-title') || '';
                
                if (type === 'image') {
                    lightboxImg.src = src;
                    lightboxImg.style.display = 'block';
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.pause();
                    lightboxVideo.src = '';
                } else if (type === 'video') {
                    lightboxVideo.src = src;
                    lightboxVideo.style.display = 'block';
                    lightboxImg.style.display = 'none';
                    lightboxImg.src = '';
                    lightboxVideo.play().catch(err => console.log('Lightbox video play failed:', err));
                }
                
                lightboxCaption.textContent = title;
                lightbox.classList.add('show');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightboxImg.src = '';
                lightboxVideo.pause();
                lightboxVideo.src = '';
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'none';
            }, 300); // Wait for transition fade to finish before removing src
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // Close if clicking outside the media container
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Close lightbox on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }
});


