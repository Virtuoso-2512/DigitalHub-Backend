var sent = false;

function removeNullValues(obj) {
    const keys = Object.keys(obj);
    const filteredKeys = keys.filter(key => obj[key] !== null);
  
    const newObj = {};
    filteredKeys.forEach(key => {
      newObj[key] = obj[key];
    });
  
    return newObj;
}

function sendUTMProperties () {
    const parentUrl = window.location;
    const url = new URL(parentUrl);

    const iframe = document.getElementById("atds-forms");
    if(!iframe) return;

    const source = url.searchParams.get('utm_source'), medium = url.searchParams.get('utm_medium'), campaign = url.searchParams.get('utm_campaign'), term = url.searchParams.get('utm_term'), content = url.searchParams.get('utm_content');

    const data = removeNullValues({ source, medium, campaign, term, content });
    iframe.contentWindow.postMessage(data, "http://localhost:8001");
    return sent = true;
}

setInterval(() => {
    if(!sent) sendUTMProperties()
}, 1000);