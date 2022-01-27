

let nodeDrawing = '<div class="node">  < p > 1000000002</p> </div > ';

let arrowDrawing = ' <div class="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="42.361"height="15.553" viewBox="0 0 42.361 15.553"><path id="arrow-right" d="M-23.561,11.276a.864.864,0,0,1,.864-.864H15.849L10.411,4.976a.865.865,0,1,1,1.223-1.223l6.912,6.912a.864.864,0,0,1,0,1.223L11.634,18.8a.865.865,0,1,1-1.223-1.223l5.438-5.436H-22.7A.864.864,0,0,1-23.561,11.276Z" transform="translate(23.561 -3.499)" fill="#2f3640" fill-rule="evenodd" /></svg></div>';


// insert at beginning go button click handler
document.querySelector("#go-at-beginning").onclick = () => {

    // fetch value from the user
    let value = Number(document.querySelector("#input-at-beginning").value);
    ll.insertNodeAtBeg(value);

    //let node = createNode(value);

}

// insert at end go button click handler

document.querySelector("#go-at-end").onclick = () => {
    // fetch value from the user
    let value = Number(document.querySelector("#input-at-end").value);
    ll.insertNodeAtEnd(value);

    //let node = createNode(value);

}

//insert at any position go button click handler

document.querySelector("#go-at-position").onclick = () => {
    // fetch value from the user
    let value = Number(document.querySelector("#input-at-position-data-value").value);
    let pos = Number(document.querySelector("#input-at-position").value);
    ll.insertNode(pos, value);

    //let node = createNode(value);

}




