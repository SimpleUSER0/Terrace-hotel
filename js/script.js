'use strict';
(() => {
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  const desktop = matchMedia('(min-width:1200px)');
  function setMenu(open, focus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navigation.classList.toggle('is-open', open);
    if (focus) menuButton.focus({preventScroll:true});
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenu(false);
    if (wasOpen && link.hash) {
      const section = document.querySelector(link.hash);
      if (section) {
        section.setAttribute('tabindex','-1'); section.focus({preventScroll:true});
        section.addEventListener('blur', () => section.removeAttribute('tabindex'), {once:true});
      }
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false,true); });
  desktop.addEventListener?.('change', () => { if (desktop.matches) setMenu(false); });

  const dialogs = [...document.querySelectorAll('dialog')];
  const openers = new WeakMap();
  function openDialog(dialog, opener) {
    if (typeof dialog.showModal !== 'function') { alert('Please use a current browser to try the demo. No request has been sent.'); return; }
    const previous = dialogs.find(item => item.open);
    const returnTarget = previous ? openers.get(previous) : opener;
    if (previous) previous.close();
    const menuWasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenu(false); openers.set(dialog, menuWasOpen ? menuButton : returnTarget);
    dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('is-locked');
    dialog.querySelector('[data-close]')?.focus({preventScroll:true});
  }
  dialogs.forEach(dialog => {
    dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (!dialogs.some(item => item.open)) { document.body.classList.remove('is-locked'); openers.get(dialog)?.focus({preventScroll:true}); }
    });
  });

  const rooms = {
    classic:{title:'Classic Double',price:65,guests:2,bed:'Queen bed',size:24,photos:['classic','bathroom'],description:'A considered retreat with soft bedding, a comfortable corner to sit and natural materials that make unwinding feel effortless. Ideal for one or two guests who want a quiet base between city adventures.'},
    deluxe:{title:'Deluxe Balcony Room',price:85,guests:2,bed:'Queen bed',size:28,photos:['deluxe','balcony','bathroom'],description:'A little extra breathing space, with an imagined private balcony for a morning coffee or a pause before dinner. Warm textures and thoughtful details create an easy, personal city stay.'},
    junior:{title:'Junior Suite',price:110,guests:3,bed:'King bed + sofa bed',size:38,photos:['junior','detail','bathroom'],description:'For guests who like a little more room to linger. This fictional suite pairs a generous sleeping area with lounge seating and an additional sofa bed for a third guest.'},
    family:{title:'Family Suite',price:135,guests:4,bed:'Two double beds',size:46,photos:['family','detail','bathroom'],description:'An imagined suite for shared city discoveries, with two double beds and extra space to settle in together. The photography is illustrative and does not show an exact floor plan.'}
  };
  const photoDescriptions = {classic:'Neutral bedroom with wooden furnishings',deluxe:'Warm bedroom with natural wood and soft daylight',junior:'Warm suite with wood panelling and lounge seating',family:'An illustrative family bedroom with separate beds',bathroom:'Modern bathroom with wooden vanity and a freestanding bath',balcony:'Small balcony with wooden chairs and plants',detail:'Dried grasses in a ceramic vase'};
  const roomDialog = document.querySelector('#room-dialog');
  const roomPhoto = document.querySelector('#room-main-photo');
  let selectedRoom = 'classic';
  function chooseRoomPhoto(index) {
    const room = rooms[selectedRoom]; const image = room.photos[index];
    roomPhoto.src = `assets/images/${image}.webp`; roomPhoto.alt = `${photoDescriptions[image]} · illustrative photography`;
    [...document.querySelector('#room-photo-options').children].forEach((button,i) => button.setAttribute('aria-pressed',String(i===index)));
  }
  document.querySelectorAll('[data-room]').forEach(opener => opener.addEventListener('click', event => {
    if (typeof roomDialog.showModal !== 'function') return;
    event.preventDefault(); selectedRoom = opener.dataset.room; const room = rooms[selectedRoom];
    document.querySelector('#room-title').textContent = room.title;
    document.querySelector('#room-modal-description').textContent = room.description;
    document.querySelector('#room-modal-facts').innerHTML = `<div><dt>Capacity</dt><dd>${room.guests} guests</dd></div><div><dt>Bed</dt><dd>${room.bed}</dd></div><div><dt>Space</dt><dd>${room.size} m²</dd></div>`;
    document.querySelector('#room-amenities').innerHTML = ['Private bathroom','Free Wi-Fi','Air conditioning','Breakfast option','Daily housekeeping','Guest support'].map(item=>`<li>${item}</li>`).join('');
    document.querySelector('#room-modal-price').innerHTML = `From <strong>€${room.price}</strong> / night <span class="small-note">· fictional demo price</span>`;
    const photoOptions = document.querySelector('#room-photo-options'); photoOptions.replaceChildren();
    room.photos.forEach((photo,i) => {
      const button = document.createElement('button'); button.type='button'; button.setAttribute('aria-label',`View room photo ${i+1}: ${photoDescriptions[photo]}`);
      const image = document.createElement('img'); image.src=`assets/images/${photo}.webp`; image.alt=''; image.width=95; image.height=70;
      button.append(image); button.addEventListener('click',()=>chooseRoomPhoto(i)); photoOptions.append(button);
    });
    chooseRoomPhoto(0); openDialog(roomDialog,opener);
  }));

  const bookingDialog=document.querySelector('#booking-dialog');
  const bookingForm=document.querySelector('#booking-form');
  const availabilityForm=document.querySelector('#availability-form');
  const infoDialog=document.querySelector('#info-dialog');
  let availabilityDraft=null;
  const today=()=>{const date=new Date();return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;};
  function tomorrow(value) {
    const date=new Date(value+'T12:00:00');
    if (Number.isNaN(date.getTime())) return today();
    date.setDate(date.getDate()+1);
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }
  function dateLimits(form) {
    form.elements.checkin.min=today();
    form.elements.checkout.min=tomorrow(form.elements.checkin.value||today());
  }
  function validate(form) {
    dateLimits(form);
    [...form.elements].forEach(field=>{
      if (!field.setCustomValidity) return;
      field.setCustomValidity(''); let message='';
      if(field.required&&!field.value.trim())message='Please complete this field.';
      if(!message&&field.type==='email'&&field.validity.typeMismatch)message='Please enter a valid sample email address.';
      if(!message&&field.name==='phone'){
        const digits=field.value.replace(/\D/g,'');
        if(!/^[+\d() .-]+$/.test(field.value)||digits.length<7||digits.length>15)message='Use a sample phone number with 7–15 digits.';
      }
      if(!message&&field.name==='checkin'&&field.value<today())message='Choose today or a future check-in date.';
      if(!message&&field.name==='checkout'&&field.value<tomorrow(form.elements.checkin.value||today()))message='Check-out must be after check-in.';
      if(!message&&field.name==='guests'&&rooms[form.elements.room.value]&&Number(field.value)>rooms[form.elements.room.value].guests)message=`${rooms[form.elements.room.value].title} accommodates up to ${rooms[form.elements.room.value].guests} guests. Choose a larger room or fewer guests.`;
      field.setCustomValidity(message);
    });
    return [...form.elements].find(field=>field.willValidate&&!field.validity.valid);
  }
  function clearBooking() {
    bookingForm.reset(); [...bookingForm.elements].forEach(field=>field.setCustomValidity?.(''));
    bookingForm.querySelector('.field-error').textContent=''; dateLimits(bookingForm);
    bookingDialog.querySelector('.form-view').hidden=false; bookingDialog.querySelector('.form-success').hidden=true;
    bookingDialog.setAttribute('aria-labelledby','booking-title');
  }
  function openBooking(opener,room=null,draft=null) {
    clearBooking();
    if(draft) for(const key of ['checkin','checkout','guests','room']) bookingForm.elements[key].value=draft[key]||'';
    if(room){bookingForm.elements.room.value=room;bookingForm.elements.guests.value=String(Math.min(Number(bookingForm.elements.guests.value)||2,rooms[room].guests));}
    if(opener.hasAttribute('data-whatsapp'))bookingForm.elements.message.value='Hello, I would like to plan a stay at Terrace 17.';
    dateLimits(bookingForm); availabilityDraft=null; openDialog(bookingDialog,opener);
  }
  document.querySelectorAll('[data-book]').forEach(button=>button.addEventListener('click',()=>openBooking(button,null,infoDialog.open?availabilityDraft:null)));
  document.querySelector('#book-room').addEventListener('click',event=>openBooking(event.currentTarget,selectedRoom));
  bookingDialog.addEventListener('close',()=>{if(!bookingDialog.open)clearBooking();});
  for(const form of [bookingForm,availabilityForm]){
    form.noValidate=true; dateLimits(form);
    for(const type of ['input','change'])form.addEventListener(type,()=>{validate(form);form.querySelector('.field-error').textContent='';});
    form.addEventListener('submit',event=>{
      event.preventDefault(); const invalid=validate(form);
      if(invalid){form.querySelector('.field-error').textContent=invalid.validationMessage;invalid.focus();return;}
      // This demo deliberately performs no network requests, storage or external contact.
      if(form===availabilityForm){
        availabilityDraft=Object.fromEntries(['checkin','checkout','guests','room'].map(key=>[key,form.elements[key].value]));
        showInfo('Demo availability request','Demo availability request — connect a booking system in the live version.',event.submitter,true);
      }else{
        bookingForm.reset();[...bookingForm.elements].forEach(field=>field.setCustomValidity?.(''));
        bookingForm.querySelector('.field-error').textContent='';bookingDialog.querySelector('.form-view').hidden=true;bookingDialog.querySelector('.form-success').hidden=false;
        bookingDialog.setAttribute('aria-labelledby','booking-success-title');bookingDialog.scrollTop=0;document.querySelector('#booking-success-title').focus({preventScroll:true});
      }
    });
  }
  function showInfo(title,description,opener,book=false,details=null){
    document.querySelector('#info-title').textContent=title;document.querySelector('#info-description').textContent=description;
    document.querySelector('#info-book').hidden=!book;const holder=document.querySelector('#info-details');holder.replaceChildren();
    if(details)holder.append(details);openDialog(infoDialog,opener);
  }
  const demos={
    phone:['A demo phone number','+995 000 00 00 00 is a deliberately non-working placeholder. In a live website, this button would call the hotel. No call is placed here.'],
    email:['A demo inbox','hello@terrace17.example uses a reserved example domain. It is not a working email address. No email is sent here.'],
    instagram:['A glimpse of hotel life','A live website would open the hotel’s official Instagram page. Terrace 17 is fictional, so no real account is linked.'],
    booking:['A place alongside Booking.com','Your own hotel website and a Booking.com listing can work alongside each other. This is a fictional hotel demo, so this button does not open a real accommodation listing.']
  };
  document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
    availabilityDraft=null;
    if(button.dataset.demo==='photos'){
      const p=document.createElement('p');p.textContent='Photography by Clay Banks, Mona Jain, Julia Blumberg, Phoebe Lynch, Nikoloz Gachechiladze and Nick Night, sourced from Unsplash. These interiors illustrate a fictional hotel and are not photographs of Terrace 17.';
      showInfo('Illustrative photography','This fictional hotel concept uses licensed stock photographs of interiors and Tbilisi.',button,false,p);
    }else{const [title,description]=demos[button.dataset.demo];showInfo(title,description,button,button.dataset.demo==='booking');}
  }));

  const gallery=[...document.querySelectorAll('[data-gallery]')];
  const lightbox=document.querySelector('#lightbox');
  const lightboxImage=document.querySelector('#lightbox-image');let current=0,touchStart=null;
  function showPhoto(index){current=(index+gallery.length)%gallery.length;const item=gallery[current];lightboxImage.src=item.href;lightboxImage.alt=item.querySelector('img').alt;document.querySelector('#lightbox-caption').textContent=item.dataset.caption;document.querySelector('#lightbox-count').textContent=`${current+1} / ${gallery.length}`;}
  gallery.forEach((item,index)=>item.addEventListener('click',event=>{if(typeof lightbox.showModal!=='function')return;event.preventDefault();showPhoto(index);openDialog(lightbox,item);}));
  document.querySelector('#photo-prev').addEventListener('click',()=>showPhoto(current-1));document.querySelector('#photo-next').addEventListener('click',()=>showPhoto(current+1));
  lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();showPhoto(current+(event.key==='ArrowRight'?1:-1));}});
  lightboxImage.addEventListener('touchstart',event=>{touchStart={x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY};},{passive:true});
  lightboxImage.addEventListener('touchend',event=>{if(!touchStart)return;const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)showPhoto(current+(dx<0?1:-1));touchStart=null;},{passive:true});
  if('IntersectionObserver' in window){
    const links=[...navigation.querySelectorAll('a[href^="#"]')];
    const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>{if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}),{rootMargin:'-14% 0px -60% 0px',threshold:0});
    links.forEach(link=>{const section=document.querySelector(link.hash);if(section)navObserver.observe(section);});
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-enabled');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));}
  }
  document.querySelector('#year').textContent=String(new Date().getFullYear());
})();
