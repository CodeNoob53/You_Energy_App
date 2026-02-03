import{N as Q,a as W}from"./vendor-DinUI5z5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const x=new Q({duration:3e3,position:{x:"right",y:"top"},dismissible:!0,ripple:!1,types:[{type:"success",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",icon:{className:"notyf__icon--error",tagName:"i"}}]}),y={success(e){x.success(e)},error(e){x.error(e)},warning(e){x.open({type:"warning",message:e})},info(e){x.open({type:"info",message:e})}},X="https://your-energy.b.goit.study/api",E={TABLET:768,DESKTOP:1440},f={CATEGORIES_MOBILE:9,CATEGORIES_DESKTOP:12,EXERCISES_MOBILE:8,EXERCISES_TABLET:10,DEFAULT:12},v={FAVORITES:"favoriteExercises",QUOTE:"quote-of-the-day"},P=300,h=W.create({baseURL:X}),O={400:"Bad request. Please check your input.",401:"Unauthorized. Please log in.",404:"Resource not found.",409:"This email has already been used.",500:"Server error. Please try again later.",default:"Something went wrong. Please try again."};h.interceptors.response.use(e=>e,e=>{var i;if(!e.response){const o=!navigator.onLine?"No internet connection. Please check your network.":"Unable to connect to server. Please try again later.";return y.error(o),Promise.reject(e)}const t=e.response.status,a=((i=e.response.data)==null?void 0:i.message)||O[t]||O.default;return y.error(a),Promise.reject(e)});const J=async()=>{const{data:e}=await h.get("/quote");return e},Y=async({filter:e,page:t=1,limit:n=f.DEFAULT})=>{const{data:a}=await h.get("/filters",{params:{filter:e,page:t,limit:n}});return a},Z=async({bodypart:e,muscles:t,equipment:n,keyword:a,page:i=1,limit:r=f.EXERCISES_TABLET})=>{const o={page:i,limit:r};e&&(o.bodypart=e),t&&(o.muscles=t),n&&(o.equipment=n),a&&(o.keyword=a);const{data:c}=await h.get("/exercises",{params:o});return c},_=async e=>{const{data:t}=await h.get(`/exercises/${e}`);return t},ee=async(e,t,n,a="")=>{const i={rate:t,email:n};a&&(i.review=a);const{data:r}=await h.patch(`/exercises/${e}/rating`,i);return r},te=async e=>{const{data:t}=await h.post("/subscription",{email:e});return t},ne=`<li class="exercise-card {{cardClass}}" data-id="{{id}}">
  <div class="exercise-card-header">
    <div class="exercise-card-left">
      <span class="exercise-workout-badge">WORKOUT</span>
      <span class="exercise-rating" aria-label="Rating: {{ratingFormatted}} out of 5">
        {{ratingFormatted}}
        <svg width="18" height="18" class="exercise-rating-star" aria-hidden="true">
          <use href="#icon-star"></use>
        </svg>
      </span>
      <button type="button" class="favorite-delete-btn" data-id="{{id}}" aria-label="Remove {{name}} from favorites">
        <svg width="20" height="20" aria-hidden="true">
          <use href="#icon-trash"></use>
        </svg>
      </button>
    </div>
    <button class="exercise-start-btn" data-id="{{id}}" aria-label="Start exercise {{name}}">
      Start
      <svg width="16" height="16" aria-hidden="true">
        <use href="#icon-arrow"></use>
      </svg>
    </button>
  </div>

  <div class="exercise-card-body">
    <span class="exercise-icon">
      <svg width="16px" height="16px" aria-hidden="true">
        <use href="#icon-quote"></use>
      </svg>
    </span>
    <h3 class="exercise-card-title">{{name}}</h3>
  </div>

  <ul class="exercise-card-meta">
    <li class="meta-item">
      <span class="meta-label">Burned calories:</span>
      <span class="meta-value">{{burnedCalories}} / {{time}} min</span>
    </li>
    <li class="meta-item">
      <span class="meta-label">Body part:</span>
      <span class="meta-value">{{bodyPart}}</span>
    </li>
    <li class="meta-item">
      <span class="meta-label">Target:</span>
      <span class="meta-value">{{target}}</span>
    </li>
  </ul>
</li>
`,ae=`<li class="category-card" data-filter="{{filter}}" data-name="{{name}}">
  <img src="{{imgURL}}" alt="" class="category-card-bg">
  <div class="category-card-overlay"></div>
  <div class="category-card-content">
    <h3 class="category-name">
      <a href="#" class="category-link">{{name}}</a>
    </h3>
    <p class="category-filter">{{filter}}</p>
  </div>
</li>
`,ie=`<div class="favorites-empty">
  <p class="favorites-empty-text">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can
    add exercises that you like to your favorites for easier access in the future.
  </p>
</div>
`,re=`<ul class="pagination-list">
  <li>
    <a href="#" class="pagination-btn pagination-first" data-page="1" aria-label="Go to first page">
      <svg width="13" height="12" class="pagination-icon flip" aria-hidden="true">
        <use href="#icon-double-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <a href="#" class="pagination-btn pagination-prev" aria-label="Go to previous page">
      <svg width="20" height="20" class="pagination-icon flip" aria-hidden="true">
        <use href="#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <ul class="pagination-numbers"></ul>
  </li>
  <li>
    <a href="#" class="pagination-btn pagination-next" aria-label="Go to next page">
      <svg width="20" height="20" class="pagination-icon" aria-hidden="true">
        <use href="#icon-arrow-right"></use>
      </svg>
    </a>
  </li>
  <li>
    <a href="#" class="pagination-btn pagination-last" aria-label="Go to last page">
      <svg width="13" height="12" class="pagination-icon" aria-hidden="true">
        <use href="#icon-double-arrow-right"></use>
      </svg>
    </a>
  </li>
</ul>
`,se={"exercise-card":ne,"category-card":ae,"favorites-empty":ie,pagination:re},R={...se},L=async e=>R[e]?R[e]:(console.warn(`Template not found in bundle: ${e}`),""),M=(e,t)=>e.replace(/\{\{(\w+)\}\}/g,(n,a)=>t[a]!==void 0?t[a]:""),oe=e=>{const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&e.quote&&(t.textContent=e.quote),n&&e.author&&(n.textContent=e.author)},ce=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No exercises found. Try another filter.</p>';return}const a=await L("exercise-card"),i=e.map(r=>M(a,{id:r._id,rating:r.rating||0,ratingFormatted:r.rating?r.rating.toFixed(1):"0.0",cardClass:"",name:r.name,burnedCalories:r.burnedCalories||0,time:r.time||0,bodyPart:r.bodyPart||"N/A",target:r.target||"N/A"})).join("");n.className="exercises-grid",n.innerHTML=i},le=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No categories found.</p>';return}const a=await L("category-card"),i=e.map(r=>M(a,{filter:r.filter,name:r.name,imgURL:r.imgURL||""})).join("");n.className="categories-grid",n.innerHTML=i},D=(e,t,n=9)=>{const a=document.getElementById(t);if(!a)return;let i="";e==="categories"?(i=Array(n).fill('<li class="category-skeleton skeleton-shimmer"></li>').join(""),a.className="categories-grid",a.innerHTML=i):(i=Array(n).fill(`
      <li class="exercise-skeleton">
        <div class="shimmer-header">
           <div class="shimmer-badge skeleton-shimmer"></div>
           <div class="shimmer-badge skeleton-shimmer"></div>
        </div>
        <div class="shimmer-title skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
      </li>
    `).join(""),a.className="exercises-grid",a.innerHTML=i)},de=()=>{const e=document.getElementById("modal-exercise-gif"),t=document.getElementById("modal-exercise-title"),n=document.getElementById("modal-exercise-rating"),a=document.getElementById("modal-target"),i=document.getElementById("modal-bodypart"),r=document.getElementById("modal-equipment"),o=document.getElementById("modal-popular"),c=document.getElementById("modal-calories"),m=document.getElementById("modal-description");e&&(e.src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3C/svg%3E"),t&&(t.textContent="Loading..."),n&&(n.innerHTML='<div class="skeleton-shimmer" style="width: 100px; height: 20px; border-radius: 4px;"></div>');const d='<span class="skeleton-shimmer" style="display: inline-block; width: 60px; height: 14px; border-radius: 2px;"></span>';a&&(a.innerHTML=d),i&&(i.innerHTML=d),r&&(r.innerHTML=d),o&&(o.innerHTML=d),c&&(c.innerHTML=d),m&&(m.innerHTML=`
      <div class="skeleton-shimmer" style="width: 100%; height: 14px; border-radius: 2px; margin-bottom: 8px;"></div>
      <div class="skeleton-shimmer" style="width: 90%; height: 14px; border-radius: 2px; margin-bottom: 8px;"></div>
      <div class="skeleton-shimmer" style="width: 40%; height: 14px; border-radius: 2px;"></div>
    `)};function U(e,{timeout:t=2e3}={}){const n=()=>{"requestIdleCallback"in window?requestIdleCallback(()=>e(),{timeout:t}):setTimeout(()=>e(),1)};document.readyState==="complete"?n():window.addEventListener("load",n,{once:!0})}const A=async(e,t,n="pagination-container")=>{const a=document.getElementById(n);if(!a)return;if(t<=1){a.innerHTML="";return}if(!a.querySelector(".pagination-list")){const g=await L("pagination");a.innerHTML=g}const i=a.querySelector(".pagination-first"),r=a.querySelector(".pagination-prev"),o=a.querySelector(".pagination-next"),c=a.querySelector(".pagination-last"),m=a.querySelector(".pagination-numbers");I(i,e===1,1),I(r,e===1,e-1),I(o,e===t,e+1),I(c,e===t,t);const u=ue(e,t).map(g=>g==="..."?'<li aria-hidden="true"><span class="pagination-dots">...</span></li>':g===e?`<li><a href="#" class="pagination-number current" aria-current="page">${g}</a></li>`:`<li><a href="#" class="pagination-number" data-page="${g}">${g}</a></li>`).join("");m.innerHTML=u};function I(e,t,n){t?(e.classList.add("disabled"),e.setAttribute("aria-disabled","true"),e.removeAttribute("data-page")):(e.classList.remove("disabled"),e.removeAttribute("aria-disabled"),e.dataset.page=n)}function ue(e,t){const n=[];if(t<=3){for(let r=1;r<=t;r++)n.push(r);return n}let a,i;e===1?(a=1,i=3):e===t?(a=t-2,i=t):(a=e-1,i=e+1),a>1&&n.push("...");for(let r=a;r<=i;r++)n.push(r);return i<t&&n.push("..."),n}function $(e,t="pagination-container"){const n=document.getElementById(t);n&&n.dataset.listenerAttached!=="true"&&(n.dataset.listenerAttached="true",n.addEventListener("click",a=>{const i=a.target.closest(".pagination-number, .pagination-btn");if(!i||i.classList.contains("disabled")||i.classList.contains("current"))return;a.preventDefault();const r=Number(i.dataset.page);r&&!isNaN(r)&&e(r)}))}function me(e="exercises-header"){var n;const t=document.getElementById(e);t?t.scrollIntoView({behavior:"smooth"}):(n=document.querySelector(".exercises-section"))==null||n.scrollIntoView({behavior:"smooth"})}const V=e=>{const t=document.getElementById(e);t&&(t.showModal(),t.dataset.backdropListener!=="true"&&(t.addEventListener("click",n=>{n.target===t&&t.close()}),t.dataset.backdropListener="true"))},b=e=>{const t=document.getElementById(e);t&&t.close()},ge=e=>{if(!e)return;const t=document.getElementById("modal-exercise-gif");t&&(t.src=e.gifUrl||"",t.alt=e.name||"Exercise");const n=document.getElementById("modal-exercise-title");n&&(n.textContent=e.name||"Exercise");const a=document.getElementById("modal-exercise-rating");if(a){const g=e.rating||0,k=Math.floor(g);a.innerHTML=`
      <span class="rating-value">${g.toFixed(1)}</span>
      <div class="rating-stars">
        ${Array.from({length:5},(Ve,K)=>`<svg class="star ${K<k?"filled":""}" width="18" height="18" aria-hidden="true">
            <use href="#icon-star"></use>
          </svg>`).join("")}
      </div>
    `}const i=document.getElementById("modal-target");i&&(i.textContent=e.target||"N/A");const r=document.getElementById("modal-bodypart");r&&(r.textContent=e.bodyPart||"N/A");const o=document.getElementById("modal-equipment");o&&(o.textContent=e.equipment||"N/A");const c=document.getElementById("modal-popular");c&&(c.textContent=e.popularity||"0");const m=document.getElementById("modal-calories");m&&(m.textContent=`${e.burnedCalories||0}/${e.time||0} min`);const d=document.getElementById("modal-description");d&&(d.textContent=e.description||"No description available.");const u=document.getElementById("exercise-modal");u&&(u.dataset.exerciseId=e._id)},fe=()=>{b("exercise-modal");const e=document.getElementById("rating-modal");e&&e.dataset.closeListener!=="true"&&(e.addEventListener("close",q),e.dataset.closeListener="true"),V("rating-modal"),q(),pe()},N=()=>{b("rating-modal")},q=()=>{const e=document.getElementById("rating-form"),t=document.getElementById("rating-display-value");e&&e.reset(),t&&(t.textContent="0.0")},pe=()=>{const e=document.getElementById("rating-stars"),t=document.getElementById("rating-display-value");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("change",n=>{if(n.target.type==="radio"){const a=parseFloat(n.target.value);t&&(t.textContent=a.toFixed(1))}}))},he=()=>{const e=document.querySelector('#rating-stars input[name="rating"]:checked');return e?parseFloat(e.value):0};function T(){try{const e=localStorage.getItem(v.FAVORITES);return e?JSON.parse(e):[]}catch(e){return console.error("Failed to get favorites:",e),[]}}function ye(e){try{const t=T();return t.includes(e)?!1:(t.push(e),localStorage.setItem(v.FAVORITES,JSON.stringify(t)),!0)}catch(t){return console.error("Failed to add favorite:",t),!1}}function F(e){try{const n=T().filter(a=>a!==e);return localStorage.setItem(v.FAVORITES,JSON.stringify(n)),!0}catch(t){return console.error("Failed to remove favorite:",t),!1}}function H(e){return T().includes(e)}async function j(e,t={}){V("exercise-modal"),de();try{const n=await _(e);ge(n),ve(e,t)}catch(n){console.error(`Failed to fetch exercise details for ${e}:`,n),b("exercise-modal")}}function ve(e,t={}){const{onRemoveFavorite:n,isFavoritesPage:a=!1}=t,i=document.getElementById("modal-close-btn");i&&(i.onclick=()=>b("exercise-modal"));const r=document.getElementById("give-rating-btn");r&&(r.onclick=()=>{fe(),Ee(e)});const o=document.getElementById("add-to-favorites-btn");if(o){const c=()=>{H(e)?o.innerHTML=`
          <span class="btn-text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="#icon-trash"></use>
          </svg>
        `:o.innerHTML=`
          <span class="btn-text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `};o.onclick=()=>{H(e)?(F(e),a?(b("exercise-modal"),n&&n()):c()):(ye(e),c())},c()}}function Ee(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>N());const n=document.getElementById("rating-form");n&&(n.onsubmit=async a=>{var c,m;if(a.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=he(),r=n.email.value.trim(),o=((c=n.review)==null?void 0:c.value.trim())||"";try{await ee(e,i,r,o),N(),y.success("Rating submitted successfully!")}catch(d){((m=d.response)==null?void 0:m.status)===409?y.error("You have already rated this exercise with this email."):y.error("Failed to submit rating. Please try again."),console.error("Failed to submit rating:",d)}})}function z(){return new Date().toISOString().split("T")[0]}function be(){try{const e=localStorage.getItem(v.QUOTE);if(!e)return null;const{quote:t,author:n,date:a}=JSON.parse(e),i=z();return a===i?{quote:t,author:n}:(localStorage.removeItem(v.QUOTE),null)}catch(e){return console.error("Error reading cached quote:",e),null}}function we(e,t){try{const n={quote:e,author:t,date:z()};localStorage.setItem(v.QUOTE,JSON.stringify(n))}catch(n){console.error("Error caching quote:",n)}}async function G(){try{let e=be();e||(e=await J(),we(e.quote,e.author)),oe(e)}catch(e){console.error("Failed to initialize quote:",e)}}const s={view:"categories",filter:"Muscles",category:null,categoryFilter:null,keyword:"",page:1},B=()=>{const e=window.innerWidth;return s.view==="categories"?e<E.TABLET?f.CATEGORIES_MOBILE:f.CATEGORIES_DESKTOP:e<E.TABLET?f.EXERCISES_MOBILE:f.EXERCISES_TABLET};function Le(){const e=document.querySelector(".main-content"),t=B();D(s.view,"exercises-container",t),Be(),Te(),$(Ie),xe(),e&&e.classList.add("loaded"),U(async()=>{try{await G(),await p()}catch(n){console.error("Error initializing home page:",n)}})}function xe(){let e,t=B();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=B();n!==t&&(t=n,s.page=1,p())},P)})}async function p(){const e=document.getElementById("exercises-container");try{const t=B();if(D(s.view,"exercises-container",t),s.view==="categories"){const n=await Y({filter:s.filter,page:s.page,limit:t});le(n.results,"exercises-container"),A(n.page?Number(n.page):1,n.totalPages||1)}else{const n={limit:t,page:s.page};s.categoryFilter==="Muscles"?n.muscles=s.category.toLowerCase():s.categoryFilter==="Body parts"?n.bodypart=s.category.toLowerCase():s.categoryFilter==="Equipment"&&(n.equipment=s.category.toLowerCase()),s.keyword&&(n.keyword=s.keyword);const a=await Z(n);ce(a.results,"exercises-container"),A(a.page?Number(a.page):1,a.totalPages||1)}}catch(t){console.error("Fetch error:",t),e&&(e.innerHTML='<p class="error-message">Failed to load data. Please try again.</p>')}}function Ie(e){e&&e!==s.page&&(s.page=e,p(),me())}function Be(){const e=document.getElementById("filter-tabs");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".filter-tab");if(n){document.querySelectorAll(".filter-tab").forEach(a=>{a.classList.remove("active")}),n.classList.add("active"),s.filter=n.dataset.filter,s.view="categories",s.page=1,s.keyword="",s.category=null,Ae();try{await p()}catch(a){console.error("Failed to fetch data:",a)}}}))}function Te(){const e=document.getElementById("exercises-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".category-card");if(n){t.preventDefault();const i=n.dataset.name,r=n.dataset.filter;if(!i)return;s.view="exercises",s.category=i,s.categoryFilter=r,s.page=1,s.keyword="",Se(i),Ce();try{await p()}catch(o){console.error("Failed to fetch exercises:",o)}return}const a=t.target.closest(".exercise-start-btn");if(a){const i=a.dataset.id;if(!i)return;await j(i)}}))}function Se(e){const t=document.getElementById("section-title"),n=document.getElementById("exercise-search-form");t&&(t.innerHTML=`Exercises / <span class="category-name">${e}</span>`),n&&n.classList.remove("hidden")}function Ae(){const e=document.getElementById("section-title"),t=document.getElementById("exercise-search-form"),n=document.getElementById("exercise-search-input"),a=document.getElementById("exercise-clear-btn");e&&(e.textContent="Exercises"),t&&t.classList.add("hidden"),n&&(n.value=""),a&&a.classList.add("hidden")}function Ce(){const e=document.getElementById("exercise-search-form"),t=document.getElementById("exercise-search-input"),n=document.getElementById("exercise-clear-btn");!e||!t||e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",t.addEventListener("input",()=>{t.value.trim()?n.classList.remove("hidden"):n.classList.add("hidden")}),n.addEventListener("click",async()=>{t.value="",n.classList.add("hidden"),t.focus(),s.keyword="",s.page=1;try{await p()}catch(a){console.error("Failed to fetch exercises:",a)}}),e.addEventListener("submit",async a=>{a.preventDefault();const i=t.value.trim();s.keyword=i,s.page=1;try{await p()}catch(r){console.error("Failed to search exercises:",r)}}))}const l={page:1,exercises:[]};function C(){const e=window.innerWidth;return e>=E.DESKTOP?1/0:e>=E.TABLET?f.EXERCISES_TABLET:f.EXERCISES_MOBILE}function Me(){return window.innerWidth<E.DESKTOP}async function Fe(e){const t=await L("favorites-empty");e.innerHTML=t}async function ke(){const e=T();if(e.length===0){l.exercises=[];return}const t=e.map(async a=>{try{return await _(a)}catch(i){return console.error(`Failed to fetch exercise ${a}:`,i),F(a),null}}),n=await Promise.all(t);l.exercises=n.filter(Boolean)}async function w(){const e=document.getElementById("favorites-container");if(!e)return;const t=document.getElementById("favorites-pagination");if(l.exercises.length===0){await Fe(e),t&&(t.innerHTML="");return}const n=C(),a=Me(),i=a?Math.ceil(l.exercises.length/n):1;l.page>i&&(l.page=i);const r=a?(l.page-1)*n:0,o=a?r+n:l.exercises.length,c=l.exercises.slice(r,o),m=await L("exercise-card"),d=c.map(u=>M(m,{id:u._id,name:u.name,burnedCalories:u.burnedCalories||0,time:u.time||0,bodyPart:u.bodyPart||"N/A",target:u.target||"N/A",rating:u.rating||0,ratingFormatted:u.rating?u.rating.toFixed(1):"0.0",cardClass:"is-favorite"})).join("");e.className="favorites-grid",e.innerHTML=d,a?A(l.page,i,"favorites-pagination"):t&&(t.innerHTML="")}function Oe(e){e&&e!==l.page&&(l.page=e,w())}function Re(){let e,t=C();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=C();n!==t&&(t=n,l.page=1,w())},P)})}function Ne(){const e=document.getElementById("favorites-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".favorite-delete-btn");if(n){t.stopPropagation();const i=n.dataset.id;i&&(F(i),l.exercises=l.exercises.filter(r=>r._id!==i),await w());return}const a=t.target.closest(".exercise-start-btn");if(a){t.stopPropagation();const i=a.dataset.id;if(!i)return;await j(i,{isFavoritesPage:!0,onRemoveFavorite:async()=>{l.exercises=l.exercises.filter(r=>r._id!==i),await w()}})}}))}function qe(){const e=document.querySelector(".favorites-page");Ne(),$(Oe,"favorites-pagination"),Re(),e&&e.classList.add("loaded"),U(async()=>{try{await G(),await ke(),await w()}catch(t){console.error("Error initializing favorites page:",t)}})}function He(){const e=document.getElementById("burger-btn"),t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-close-btn");if(!e||!t||!n)return;e.addEventListener("click",Pe),n.addEventListener("click",S),t.addEventListener("click",i=>{i.target===t&&S()}),t.querySelectorAll(".mobile-nav-link").forEach(i=>{i.addEventListener("click",()=>{S()})}),t.addEventListener("close",()=>{e.setAttribute("aria-expanded","false"),document.body.style.overflow=""})}function Pe(){const e=document.getElementById("mobile-menu"),t=document.getElementById("burger-btn");e&&(e.showModal(),document.body.style.overflow="hidden"),t&&t.setAttribute("aria-expanded","true")}function S(){const e=document.getElementById("mobile-menu");e&&e.close()}function _e(){const e=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(n=>{const a=n.getAttribute("href");e.endsWith(a.replace("./","/"))||e.endsWith("/")&&a.includes("index.html")||e.endsWith("/index.html")&&a.includes("index.html")||e.includes("favorites")&&a.includes("favorites")?(n.setAttribute("aria-current","page"),n.classList.add("active")):(n.removeAttribute("aria-current"),n.classList.remove("active"))})}document.addEventListener("DOMContentLoaded",()=>{He(),_e()});function De(){const e=window.location.pathname,t=document.getElementById("nav-home"),n=document.getElementById("nav-favorites");e.includes("favorites")?n==null||n.classList.add("active"):t==null||t.classList.add("active")}function Ue(){const e=document.querySelector(".header");if(!e)return;const t=()=>window.innerWidth<768,n=()=>{t()&&window.scrollY>0?e.classList.add("scrolled"):e.classList.remove("scrolled")};window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n,{passive:!0}),n()}function $e(){const e=document.getElementById("subscription-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value;try{await te(n),y.success("Successfully subscribed!"),e.reset()}catch{}})}document.addEventListener("DOMContentLoaded",()=>{De(),$e(),Ue(),document.getElementById("exercises-container")&&Le(),document.getElementById("favorites-container")&&qe()});
//# sourceMappingURL=main-Gjo3ReZF.js.map
