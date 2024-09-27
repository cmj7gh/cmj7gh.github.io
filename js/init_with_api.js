function init() {
    var loc = window.location.href;
    var HTMLvalidLinkStr = 'https://validator.w3.org/check?uri=' + loc;
    var CSSvalidLinkStr = 'https://jigsaw.w3.org/css-validator/validator?uri=' +
                           loc + '?profile=css3';
    document.getElementById("vLink1").setAttribute("href", HTMLvalidLinkStr);
    document.getElementById("vLink2").setAttribute("href", CSSvalidLinkStr);
  
  
    // Call the HTML validator API and add the result to the footer
    fetch("https://html5.validator.nu/?out=json&doc=" + encodeURIComponent(loc), {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if (data.messages.length === 0) {
            console.log("No Errors");
            document.getElementById("HTMLCSS").innerHTML = "<strong> HTML/CSS </strong> Valid!";
        } else {
            console.log("Errors");
            console.log(data.messages); // data.messages is an array
            document.getElementById("HTMLCSS").innerHTML = "<strong> HTML/CSS </strong> NOT Valid!";
        }
    })
    .catch(error => {
        console.warn(error);
    });
}

function md_to_html(file){
    fetch(file)
    //.then(res => response.)
    .then(response => {
      if (!response.ok) {
        // If the file is not found (status 404), throw an error
        throw new Error('File not found');
      }
      return response.text();
    })
    .then(mdContent => {
    showdown.setOption('tables','true');
    var conv = new showdown.Converter();
    var md_html = conv.makeHtml(mdContent);
    document.getElementById('md_to_html').innerHTML = md_html;
    })
    .catch(error => {
      console.log(error);
      document
        .getElementById('md_to_html')
        .innerHTML = 'Hmm - there is something wrong with this page. Please check back later!';
    });
  }