import{N as X,a as J}from"./vendor-DinUI5z5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const x=new X({duration:3e3,position:{x:"right",y:"top"},dismissible:!0,ripple:!1,types:[{type:"success",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",icon:{className:"notyf__icon--error",tagName:"i"}}]});function I(){const e=document.querySelector(".notyf");if(e){e.hasAttribute("popover")||e.setAttribute("popover","manual");try{e.matches(":popover-open")&&e.hidePopover(),e.showPopover()}catch{}}}const v={success(e){x.success(e),I()},error(e){x.error(e),I()},warning(e){x.open({type:"warning",message:e}),I()},info(e){x.open({type:"info",message:e}),I()}},Y="https://your-energy.b.goit.study/api",E={TABLET:768,DESKTOP:1440},f={CATEGORIES_MOBILE:9,CATEGORIES_DESKTOP:12,EXERCISES_MOBILE:8,EXERCISES_TABLET:10,DEFAULT:12},p={FAVORITES:"favoriteExercises",QUOTE:"quote-of-the-day"},U=300,y=J.create({baseURL:Y}),q={400:"Bad request. Please check your input.",401:"Unauthorized. Please log in.",404:"Resource not found.",409:"This email has already been used.",500:"Server error. Please try again later.",default:"Something went wrong. Please try again."};y.interceptors.response.use(e=>e,e=>{var i;if(!e.response){const o=!navigator.onLine?"No internet connection. Please check your network.":"Unable to connect to server. Please try again later.";return v.error(o),Promise.reject(e)}const t=e.response.status;if(t===409)return Promise.reject(e);const r=((i=e.response.data)==null?void 0:i.message)||q[t]||q.default;return v.error(r),Promise.reject(e)});const Z=async()=>{const{data:e}=await y.get("/quote");return e},ee=async({filter:e,page:t=1,limit:n=f.DEFAULT})=>{const{data:r}=await y.get("/filters",{params:{filter:e,page:t,limit:n}});return r},te=async({bodypart:e,muscles:t,equipment:n,keyword:r,page:i=1,limit:a=f.EXERCISES_TABLET})=>{const o={page:i,limit:a};e&&(o.bodypart=e),t&&(o.muscles=t),n&&(o.equipment=n),r&&(o.keyword=r);const{data:c}=await y.get("/exercises",{params:o});return c},$=async e=>{const{data:t}=await y.get(`/exercises/${e}`);return t},ne=async(e,t,n,r="")=>{const i={rate:t,email:n};r&&(i.review=r);const{data:a}=await y.patch(`/exercises/${e}/rating`,i);return a},re=async e=>{const{data:t}=await y.post("/subscription",{email:e});return t},ie=`<li class="exercise-card {{cardClass}}" data-id="{{id}}">
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
`,se=`<div class="favorites-empty">
  <p class="favorites-empty-text">
    It appears that you haven't added any exercises to your favorites yet. To get started, you can
    add exercises that you like to your favorites for easier access in the future.
  </p>
</div>
`,oe=`<ul class="pagination-list">
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
`,ce={"exercise-card":ie,"category-card":ae,"favorites-empty":se,pagination:oe},P={...ce},L=async e=>P[e]?P[e]:(console.warn(`Template not found in bundle: ${e}`),""),k=(e,t)=>e.replace(/\{\{(\w+)\}\}/g,(n,r)=>t[r]!==void 0?t[r]:""),le=e=>{const t=document.getElementById("quote-text"),n=document.getElementById("quote-author");t&&e.quote&&(t.textContent=e.quote),n&&e.author&&(n.textContent=e.author)},de=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No exercises found. Try another filter.</p>';return}const r=await L("exercise-card"),i=e.map(a=>k(r,{id:a._id,rating:a.rating||0,ratingFormatted:a.rating?a.rating.toFixed(1):"0.0",cardClass:"",name:a.name,burnedCalories:a.burnedCalories||0,time:a.time||0,bodyPart:a.bodyPart||"N/A",target:a.target||"N/A"})).join("");n.className="exercises-grid",n.innerHTML=i},ue=async(e,t)=>{const n=document.getElementById(t);if(!n)return;if(e.length===0){n.innerHTML='<p class="no-results">No categories found.</p>';return}const r=await L("category-card"),i=e.map(a=>k(r,{filter:a.filter,name:a.name,imgURL:a.imgURL||""})).join("");n.className="categories-grid",n.innerHTML=i},j=(e,t,n=9)=>{const r=document.getElementById(t);if(!r)return;let i="";e==="categories"?(i=Array(n).fill('<li class="category-skeleton skeleton-shimmer"></li>').join(""),r.className="categories-grid",r.innerHTML=i):(i=Array(n).fill(`
      <li class="exercise-skeleton">
        <div class="shimmer-header">
           <div class="shimmer-badge skeleton-shimmer"></div>
           <div class="shimmer-badge skeleton-shimmer"></div>
        </div>
        <div class="shimmer-title skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
      </li>
    `).join(""),r.className="exercises-grid",r.innerHTML=i)},me=()=>{const e=document.getElementById("modal-exercise-gif"),t=document.getElementById("modal-exercise-title"),n=document.getElementById("modal-exercise-rating"),r=document.getElementById("modal-target"),i=document.getElementById("modal-bodypart"),a=document.getElementById("modal-equipment"),o=document.getElementById("modal-popular"),c=document.getElementById("modal-calories"),m=document.getElementById("modal-description");e&&(e.src="data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3C/svg%3E"),t&&(t.textContent="Loading..."),n&&(n.innerHTML='<div class="skeleton-shimmer" style="width: 100px; height: 20px; border-radius: 4px;"></div>');const d='<span class="skeleton-shimmer" style="display: inline-block; width: 60px; height: 14px; border-radius: 2px;"></span>';r&&(r.innerHTML=d),i&&(i.innerHTML=d),a&&(a.innerHTML=d),o&&(o.innerHTML=d),c&&(c.innerHTML=d),m&&(m.innerHTML=`
      <div class="skeleton-shimmer" style="width: 100%; height: 14px; border-radius: 2px; margin-bottom: 8px;"></div>
      <div class="skeleton-shimmer" style="width: 90%; height: 14px; border-radius: 2px; margin-bottom: 8px;"></div>
      <div class="skeleton-shimmer" style="width: 40%; height: 14px; border-radius: 2px;"></div>
    `)};function V(e,{timeout:t=2e3}={}){const n=()=>{"requestIdleCallback"in window?requestIdleCallback(()=>e(),{timeout:t}):setTimeout(()=>e(),1)};document.readyState==="complete"?n():window.addEventListener("load",n,{once:!0})}const M=async(e,t,n="pagination-container")=>{const r=document.getElementById(n);if(!r)return;if(t<=1){r.innerHTML="";return}if(!r.querySelector(".pagination-list")){const g=await L("pagination");r.innerHTML=g}const i=r.querySelector(".pagination-first"),a=r.querySelector(".pagination-prev"),o=r.querySelector(".pagination-next"),c=r.querySelector(".pagination-last"),m=r.querySelector(".pagination-numbers");B(i,e===1,1),B(a,e===1,e-1),B(o,e===t,e+1),B(c,e===t,t);const u=ge(e,t).map(g=>g==="..."?'<li aria-hidden="true"><span class="pagination-dots">...</span></li>':g===e?`<li><a href="#" class="pagination-number current" aria-current="page">${g}</a></li>`:`<li><a href="#" class="pagination-number" data-page="${g}">${g}</a></li>`).join("");m.innerHTML=u};function B(e,t,n){t?(e.classList.add("disabled"),e.setAttribute("aria-disabled","true"),e.removeAttribute("data-page")):(e.classList.remove("disabled"),e.removeAttribute("aria-disabled"),e.dataset.page=n)}function ge(e,t){const n=[];if(t<=3){for(let a=1;a<=t;a++)n.push(a);return n}let r,i;e===1?(r=1,i=3):e===t?(r=t-2,i=t):(r=e-1,i=e+1),r>1&&n.push("...");for(let a=r;a<=i;a++)n.push(a);return i<t&&n.push("..."),n}function z(e,t="pagination-container"){const n=document.getElementById(t);n&&n.dataset.listenerAttached!=="true"&&(n.dataset.listenerAttached="true",n.addEventListener("click",r=>{const i=r.target.closest(".pagination-number, .pagination-btn");if(!i||i.classList.contains("disabled")||i.classList.contains("current"))return;r.preventDefault();const a=Number(i.dataset.page);a&&!isNaN(a)&&e(a)}))}function fe(e="exercises-header"){var n;const t=document.getElementById(e);t?t.scrollIntoView({behavior:"smooth"}):(n=document.querySelector(".exercises-section"))==null||n.scrollIntoView({behavior:"smooth"})}const O=e=>{const t=document.getElementById(e);if(t&&(t.showModal(),t.dataset.backdropListener!=="true")){let n=null;t.addEventListener("mousedown",r=>{n=r.target}),t.addEventListener("click",r=>{r.target===t&&n===t&&t.close(),n=null}),t.dataset.backdropListener="true"}},b=e=>{const t=document.getElementById(e);t&&t.close()},pe=e=>{if(!e)return;const t=document.getElementById("modal-exercise-gif");t&&(t.src=e.gifUrl||"",t.alt=e.name||"Exercise");const n=document.getElementById("modal-exercise-title");n&&(n.textContent=e.name||"Exercise");const r=document.getElementById("modal-exercise-rating");if(r){const g=e.rating||0,N=Math.floor(g);r.innerHTML=`
      <span class="rating-value">${g.toFixed(1)}</span>
      <div class="rating-stars">
        ${Array.from({length:5},(Ke,W)=>`<svg class="star ${W<N?"filled":""}" width="18" height="18" aria-hidden="true">
            <use href="#icon-star"></use>
          </svg>`).join("")}
      </div>
    `}const i=document.getElementById("modal-target");i&&(i.textContent=e.target||"N/A");const a=document.getElementById("modal-bodypart");a&&(a.textContent=e.bodyPart||"N/A");const o=document.getElementById("modal-equipment");o&&(o.textContent=e.equipment||"N/A");const c=document.getElementById("modal-popular");c&&(c.textContent=e.popularity||"0");const m=document.getElementById("modal-calories");m&&(m.textContent=`${e.burnedCalories||0}/${e.time||0} min`);const d=document.getElementById("modal-description");d&&(d.textContent=e.description||"No description available.");const u=document.getElementById("exercise-modal");u&&(u.dataset.exerciseId=e._id)};let A=null;const he=e=>{const t=document.getElementById("rating-modal");A=e,b("exercise-modal"),t&&t.dataset.closeListener!=="true"&&(t.addEventListener("close",()=>{_(),A&&(ye(),A=null)}),t.dataset.closeListener="true"),O("rating-modal"),_(),ve()},ye=()=>{O("exercise-modal")},H=()=>{b("rating-modal")},_=()=>{const e=document.getElementById("rating-form"),t=document.getElementById("rating-display-value");e&&e.reset(),t&&(t.textContent="0.0")},ve=()=>{const e=document.getElementById("rating-stars"),t=document.getElementById("rating-display-value");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("change",n=>{if(n.target.type==="radio"){const r=parseFloat(n.target.value);t&&(t.textContent=r.toFixed(1))}}))},Ee=()=>{const e=document.querySelector('#rating-stars input[name="rating"]:checked');return e?parseFloat(e.value):0};function be(e){if(!Array.isArray(e)||e.length===0)return e;if(typeof e[0]=="object"&&e[0]._id){const t=e.map(n=>n._id).filter(Boolean);return localStorage.setItem(p.FAVORITES,JSON.stringify(t)),t}return e}function S(){try{const e=localStorage.getItem(p.FAVORITES);if(!e)return[];const t=JSON.parse(e);return be(t)}catch(e){return console.error("Failed to get favorites:",e),[]}}function we(e){try{const t=S();return t.includes(e)?!1:(t.push(e),localStorage.setItem(p.FAVORITES,JSON.stringify(t)),!0)}catch(t){return console.error("Failed to add favorite:",t),!1}}function R(e){try{const n=S().filter(r=>r!==e);return localStorage.setItem(p.FAVORITES,JSON.stringify(n)),!0}catch(t){return console.error("Failed to remove favorite:",t),!1}}function D(e){return S().includes(e)}async function G(e,t={}){O("exercise-modal"),me();try{const n=await $(e);pe(n),Le(e,t)}catch(n){console.error(`Failed to fetch exercise details for ${e}:`,n),b("exercise-modal")}}function Le(e,t={}){const{onRemoveFavorite:n,isFavoritesPage:r=!1}=t,i=document.getElementById("modal-close-btn");i&&(i.onclick=()=>b("exercise-modal"));const a=document.getElementById("give-rating-btn");a&&(a.onclick=()=>{he(e),xe(e)});const o=document.getElementById("add-to-favorites-btn");if(o){const c=()=>{D(e)?o.innerHTML=`
          <span class="btn-text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="#icon-trash"></use>
          </svg>
        `:o.innerHTML=`
          <span class="btn-text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `};o.onclick=()=>{D(e)?(R(e),r?(b("exercise-modal"),n&&n()):c()):(we(e),c())},c()}}function xe(e){const t=document.getElementById("rating-modal-close-btn");t&&(t.onclick=()=>H());const n=document.getElementById("rating-form");n&&(n.onsubmit=async r=>{var c,m;if(r.preventDefault(),!n.checkValidity()){n.reportValidity();return}const i=Ee(),a=n.email.value.trim(),o=((c=n.review)==null?void 0:c.value.trim())||"";try{await ne(e,i,a,o),H(),v.success("Rating submitted successfully!")}catch(d){((m=d.response)==null?void 0:m.status)===409?v.error("You have already rated this exercise."):v.error("Failed to submit rating. Please try again."),console.error("Failed to submit rating:",d)}})}function K(){return new Date().toISOString().split("T")[0]}function Ie(){try{const e=localStorage.getItem(p.QUOTE);if(!e)return null;const{quote:t,author:n,date:r}=JSON.parse(e),i=K();return r===i?{quote:t,author:n}:(localStorage.removeItem(p.QUOTE),null)}catch(e){return console.error("Error reading cached quote:",e),null}}function Be(e,t){try{const n={quote:e,author:t,date:K()};localStorage.setItem(p.QUOTE,JSON.stringify(n))}catch(n){console.error("Error caching quote:",n)}}async function Q(){try{let e=Ie();e||(e=await Z(),Be(e.quote,e.author)),le(e)}catch(e){console.error("Failed to initialize quote:",e)}}const s={view:"categories",filter:"Muscles",category:null,categoryFilter:null,keyword:"",page:1},T=()=>{const e=window.innerWidth;return s.view==="categories"?e<E.TABLET?f.CATEGORIES_MOBILE:f.CATEGORIES_DESKTOP:e<E.TABLET?f.EXERCISES_MOBILE:f.EXERCISES_TABLET};function Te(){const e=document.querySelector(".main-content"),t=T();j(s.view,"exercises-container",t),Ce(),Me(),z(Ae),Se(),e&&e.classList.add("loaded"),V(async()=>{try{await Q(),await h()}catch(n){console.error("Error initializing home page:",n)}})}function Se(){let e,t=T();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=T();n!==t&&(t=n,s.page=1,h())},U)})}async function h(){const e=document.getElementById("exercises-container");try{const t=T();if(j(s.view,"exercises-container",t),s.view==="categories"){const n=await ee({filter:s.filter,page:s.page,limit:t});ue(n.results,"exercises-container"),M(n.page?Number(n.page):1,n.totalPages||1)}else{const n={limit:t,page:s.page};s.categoryFilter==="Muscles"?n.muscles=s.category.toLowerCase():s.categoryFilter==="Body parts"?n.bodypart=s.category.toLowerCase():s.categoryFilter==="Equipment"&&(n.equipment=s.category.toLowerCase()),s.keyword&&(n.keyword=s.keyword);const r=await te(n);de(r.results,"exercises-container"),M(r.page?Number(r.page):1,r.totalPages||1)}}catch(t){console.error("Fetch error:",t),e&&(e.innerHTML='<p class="error-message">Failed to load data. Please try again.</p>')}}function Ae(e){e&&e!==s.page&&(s.page=e,h(),fe())}function Ce(){const e=document.getElementById("filter-tabs");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".filter-tab");if(n){document.querySelectorAll(".filter-tab").forEach(r=>{r.classList.remove("active")}),n.classList.add("active"),s.filter=n.dataset.filter,s.view="categories",s.page=1,s.keyword="",s.category=null,ke();try{await h()}catch(r){console.error("Failed to fetch data:",r)}}}))}function Me(){const e=document.getElementById("exercises-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".category-card");if(n){t.preventDefault();const i=n.dataset.name,a=n.dataset.filter;if(!i)return;s.view="exercises",s.category=i,s.categoryFilter=a,s.page=1,s.keyword="",Fe(i),Oe();try{await h()}catch(o){console.error("Failed to fetch exercises:",o)}return}const r=t.target.closest(".exercise-start-btn");if(r){const i=r.dataset.id;if(!i)return;await G(i)}}))}function Fe(e){const t=document.getElementById("section-title"),n=document.getElementById("exercise-search-form");t&&(t.innerHTML=`Exercises / <span class="category-name">${e}</span>`),n&&n.classList.remove("hidden")}function ke(){const e=document.getElementById("section-title"),t=document.getElementById("exercise-search-form"),n=document.getElementById("exercise-search-input"),r=document.getElementById("exercise-clear-btn");e&&(e.textContent="Exercises"),t&&t.classList.add("hidden"),n&&(n.value=""),r&&r.classList.add("hidden")}function Oe(){const e=document.getElementById("exercise-search-form"),t=document.getElementById("exercise-search-input"),n=document.getElementById("exercise-clear-btn");!e||!t||e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",t.addEventListener("input",()=>{t.value.trim()?n.classList.remove("hidden"):n.classList.add("hidden")}),n.addEventListener("click",async()=>{t.value="",n.classList.add("hidden"),t.focus(),s.keyword="",s.page=1;try{await h()}catch(r){console.error("Failed to fetch exercises:",r)}}),e.addEventListener("submit",async r=>{r.preventDefault();const i=t.value.trim();s.keyword=i,s.page=1;try{await h()}catch(a){console.error("Failed to search exercises:",a)}}))}const l={page:1,exercises:[]};function F(){const e=window.innerWidth;return e>=E.DESKTOP?1/0:e>=E.TABLET?f.EXERCISES_TABLET:f.EXERCISES_MOBILE}function Re(){return window.innerWidth<E.DESKTOP}async function Ne(e){const t=await L("favorites-empty");e.innerHTML=t}async function qe(){const e=S();if(e.length===0){l.exercises=[];return}const t=e.map(async r=>{try{return await $(r)}catch(i){return console.error(`Failed to fetch exercise ${r}:`,i),R(r),null}}),n=await Promise.all(t);l.exercises=n.filter(Boolean)}async function w(){const e=document.getElementById("favorites-container");if(!e)return;const t=document.getElementById("favorites-pagination");if(l.exercises.length===0){await Ne(e),t&&(t.innerHTML="");return}const n=F(),r=Re(),i=r?Math.ceil(l.exercises.length/n):1;l.page>i&&(l.page=i);const a=r?(l.page-1)*n:0,o=r?a+n:l.exercises.length,c=l.exercises.slice(a,o),m=await L("exercise-card"),d=c.map(u=>k(m,{id:u._id,name:u.name,burnedCalories:u.burnedCalories||0,time:u.time||0,bodyPart:u.bodyPart||"N/A",target:u.target||"N/A",rating:u.rating||0,ratingFormatted:u.rating?u.rating.toFixed(1):"0.0",cardClass:"is-favorite"})).join("");e.className="favorites-grid",e.innerHTML=d,r?M(l.page,i,"favorites-pagination"):t&&(t.innerHTML="")}function Pe(e){e&&e!==l.page&&(l.page=e,w())}function He(){let e,t=F();window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{const n=F();n!==t&&(t=n,l.page=1,w())},U)})}function _e(){const e=document.getElementById("favorites-container");e&&e.dataset.listenerAttached!=="true"&&(e.dataset.listenerAttached="true",e.addEventListener("click",async t=>{const n=t.target.closest(".favorite-delete-btn");if(n){t.stopPropagation();const i=n.dataset.id;i&&(R(i),l.exercises=l.exercises.filter(a=>a._id!==i),await w());return}const r=t.target.closest(".exercise-start-btn");if(r){t.stopPropagation();const i=r.dataset.id;if(!i)return;await G(i,{isFavoritesPage:!0,onRemoveFavorite:async()=>{l.exercises=l.exercises.filter(a=>a._id!==i),await w()}})}}))}function De(){const e=document.querySelector(".favorites-page");_e(),z(Pe,"favorites-pagination"),He(),e&&e.classList.add("loaded"),V(async()=>{try{await Q(),await qe(),await w()}catch(t){console.error("Error initializing favorites page:",t)}})}function Ue(){const e=document.getElementById("burger-btn"),t=document.getElementById("mobile-menu"),n=document.getElementById("mobile-close-btn");if(!e||!t||!n)return;e.addEventListener("click",$e),n.addEventListener("click",C),t.addEventListener("click",i=>{i.target===t&&C()}),t.querySelectorAll(".mobile-nav-link").forEach(i=>{i.addEventListener("click",()=>{C()})}),t.addEventListener("close",()=>{e.setAttribute("aria-expanded","false"),document.body.style.overflow=""})}function $e(){const e=document.getElementById("mobile-menu"),t=document.getElementById("burger-btn");e&&(e.showModal(),document.body.style.overflow="hidden"),t&&t.setAttribute("aria-expanded","true")}function C(){const e=document.getElementById("mobile-menu");e&&e.close()}function je(){const e=window.location.pathname;document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(n=>{const r=n.getAttribute("href");e.endsWith(r.replace("./","/"))||e.endsWith("/")&&r.includes("index.html")||e.endsWith("/index.html")&&r.includes("index.html")||e.includes("favorites")&&r.includes("favorites")?(n.setAttribute("aria-current","page"),n.classList.add("active")):(n.removeAttribute("aria-current"),n.classList.remove("active"))})}document.addEventListener("DOMContentLoaded",()=>{Ue(),je()});function Ve(){const e=window.location.pathname,t=document.getElementById("nav-home"),n=document.getElementById("nav-favorites");e.includes("favorites")?n==null||n.classList.add("active"):t==null||t.classList.add("active")}function ze(){const e=document.querySelector(".header");if(!e)return;const t=()=>window.innerWidth<768,n=()=>{t()&&window.scrollY>0?e.classList.add("scrolled"):e.classList.remove("scrolled")};window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n,{passive:!0}),n()}function Ge(){const e=document.getElementById("subscription-form");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=e.email.value;try{await re(n),v.success("Successfully subscribed!"),e.reset()}catch{}})}document.addEventListener("DOMContentLoaded",()=>{Ve(),Ge(),ze(),document.getElementById("exercises-container")&&Te(),document.getElementById("favorites-container")&&De()});
//# sourceMappingURL=main-E6OLgYX0.js.map
