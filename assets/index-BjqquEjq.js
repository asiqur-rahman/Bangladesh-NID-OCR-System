(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();window.addEventListener("DOMContentLoaded",()=>{new bootstrap.Modal(document.getElementById("landingModal")).show()});const p="https://home.braintechsolution.com:8080";var f=!0;window.previewImage=function(d,a,o){const i=document.getElementById(d),s=document.getElementById(a),n=document.getElementById("results"),c=document.getElementById(a.replace("Preview","Placeholder"));if(i.files&&i.files[0]){const t=new FileReader;t.onload=function(r){s.src=r.target.result,s.classList.remove("d-none"),s.classList.add("fade-up"),c.classList.add("d-none")},t.readAsDataURL(i.files[0]),h(d,o)}else{if(o){const t=document.getElementById(o);t.innerHTML=""}s.classList.add("d-none"),c.classList.remove("d-none"),m()}n.classList.add("d-none"),n.classList.remove("process-animation"),document.getElementById("ocrResults").innerHTML="",document.getElementById("faceMatchResults").innerHTML=""};function h(d,a){const o=document.getElementById(d);if(a){const c=document.getElementById(a);c.innerHTML="";var i=new Headers;i.append("X-API-KEY","ds");var s=new FormData;s.append("image",o.files[0],""),s.append("high_accuracy",high_accuracy.value);var n={method:"POST",headers:i,body:s,redirect:"follow"};fetch(`${p}/image-quality/`,n).then(t=>t.json()).then(t=>{f=t.acceptableScore,m(),t.acceptableScore==0?c.innerHTML=`<span style="color: red; font-size: 14px;" >⚠️ Warning : ${t.message}</span>`:t.acceptableScore==50?c.innerHTML=`<span style="color: gray; font-size: 14px;" >Warning : ${t.message}</span>`:t.acceptableScore==100&&(c.innerHTML=`<span style="color: green; font-size: 14px;" >${t.message}</span>`)}).catch(t=>console.log("error",t))}else m()}function m(){const d=document.getElementById("processButton"),a=document.getElementById("frontImage").files[0],o=document.getElementById("profileImage").files[0];d.disabled=!(a&&o&&f)}window.processImages=async function(){const d=document.getElementById("frontImage").files[0],a=document.getElementById("profileImage").files[0],o=document.getElementById("loading"),i=document.getElementById("results"),s=document.getElementById("ocrResults"),n=document.getElementById("faceMatchResults");if(!d||!a){alert("Please select both front and back images of the ID card");return}try{let l=function(e){i.classList.remove("d-none"),i.classList.add("process-animation"),s.innerHTML=`
        <div class="row g-4">
          <div class="col-md-12">
            <div class="card p-4 fade-up" style="animation-delay: 0.2s">
              <h3 class="h5 mb-3">Personal Information</h3>
              <div class="d-flex flex-column gap-2">
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">Bangla Name:</span>
                  <span class="fw-medium">${e.bng_name}</span>
                </div>
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">English Name:</span>
                  <span class="fw-medium">${e.eng_name}</span>
                </div>
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">Father Name:</span>
                  <span class="fw-medium">${e.father_name}</span>
                </div>
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">Mother name:</span>
                  <span class="fw-medium">${e.mother_name}</span>
                </div>
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">Date of Birth:</span>
                  <span class="fw-medium">${e.dateOfBirth}</span>
                </div>
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">ID Number:</span>
                  <span class="fw-medium">${e.idNumber}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="card p-4 fade-up" style="animation-delay: 0.4s">
              <h3 class="h5 mb-3">Additional Details</h3>
              <div class="d-flex flex-column gap-2">
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">Times Required :</span>
                  <span class="fw-medium">${e.total_time_in_seconds} (sec)</span>
                </div>
                <div class="d-flex">
                  <span class="text-muted" style="width: 120px">Request ID:</span>
                  <span class="fw-medium">${e.requestId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,n.innerHTML=`
        <div class="card p-4 fade-up" style="animation-delay: 0.6s">
          <h3 class="h5 mb-3">Face Match Results</h3>
          <div class="d-flex align-items-center gap-3">
            <div class="success-checkmark bg-success bg-opacity-10 rounded-circle p-3">
              <svg width="24" height="24" class="${e.faceMatch?"text-success":"text-danger"}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${e.faceMatch?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'}
                
              </svg>
            </div>
            <div>
              <p class="h6 mb-1">
                ${e.faceMatch?"Face Match Successful":"Face Match Failed"}
              </p>
              <p class="text-muted small mb-0">
                Confidence Score: ${e.matchConfidence}% 
              </p>
              <p class="text-muted small mb-0">
                Medium Score: ${e.matchConfidenceThreshold}% 
              </p>
            </div>
          </div>
          <div class="progress mt-3" style="height: 8px;">
            <div class="progress-bar bg-success" 
                role="progressbar" 
                style="width: ${e.matchConfidence}%" 
                aria-valuenow="${e.matchConfidence}" 
                aria-valuemin="0" 
                aria-valuemax="100">
            </div>
          </div>
        </div>
      `};var g=l;o.classList.remove("d-none");var c=new Headers;c.append("X-API-KEY","ds");var t=new FormData;t.append("front_side",d,""),t.append("profile",a,"");var r={method:"POST",headers:c,body:t,redirect:"follow"};await fetch(`${p}/process-ocr/`,r).then(e=>e.json()).then(e=>{const u={eng_name:e.eng_name,bng_name:e.bng_name,father_name:e.father_name,mother_name:e.mother_name,idNumber:e.nid_num,dateOfBirth:e.dob,faceMatch:e.is_face_matched,matchConfidence:e.face_matched_score,matchConfidenceThreshold:e.face_matched_threshold,requestId:e.requestId,total_time_in_seconds:e.total_time_in_seconds};l(u)}).catch(e=>console.log("error",e))}catch(l){console.error("Error processing images:",l),alert("An error occurred while processing the images. Please try again.")}finally{o.classList.add("d-none")}};
