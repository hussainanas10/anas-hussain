
//display of param key and values
let parambox = document.getElementById("parameterBox");
parambox.style.display = "none";
//console.log(parambox);

//radio button
//json custom param

let customradio = document.getElementById("paramsradio");
customradio.addEventListener('click', () => {
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parameterBox").style.display = "block";
    document.getElementById("params").style.display = "block";
});
let jsonradio = document.getElementById("jsonradio");
jsonradio.addEventListener('click', () => {
    document.getElementById("requestJsonBox").style.display = "block";
    document.getElementById("parameterBox").style.display = "none";
    document.getElementById("params").style.display = "none";
});

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addedParamsCount = 0;
let addbutton = document.getElementById('addParam');
addbutton.addEventListener('click', () => {

    let blank = document.getElementById("params");
    let string = ` <div class=" form-row my-2">
    <lable for='url' class="col-2 sm-2 col-form-lable">Parameter ${addedParamsCount + 2} </lable>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterkey${addedParamsCount + 2}" placeholder="Enter paramenter ${addedParamsCount + 2} key"> 
    </div>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parametervalue${addedParamsCount + 2}" placeholder="Enter parameter ${addedParamsCount + 2} value">
    </div>
    <button type="button" class="btn btn-primary deleteParam">-</button>
    </div>`;
    let convert = getElementFromString(string);
    blank.appendChild(convert);
    // console.log(convert);
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
    addedParamsCount++;
});

let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    // console.log("both kuch hua");
    document.getElementById("responseJsonText").value = "Please Wait...";
    let url = document.getElementById("urlField").value;
    let request = document.querySelector("input[name=requestType]:checked").value;
    let contentType = document.querySelector("input[name=contentType]:checked").value;

    if (contentType === 'params') {
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;
            }
        }
        // console.log(data);
        data = JSON.stringify(data)
        // console.log(data);

    }
    else {
        data = document.getElementById("responseJsonText").value;
        console.log(data);
    }
    if (request == "GET") {
        fetch(url, {
            method: "GET",
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text;
            });
    }
    else if(request =="POST") {
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text
            });
    }
    // console.log(text);
    else if(request =="PUT") {
        fetch(url, {
            method: "PUT",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text
            });
    }
    else if(request=="DELETE"){
        fetch(url,{
            method:"DELETE",
            body: data,
            
        })
    }

});

