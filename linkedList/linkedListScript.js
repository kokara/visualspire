// Class blueprint to create a Node instance.
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        // this.createNode();
    }

    renderNode() {

        // creating a div
        let n = document.createElement('div');
        n.classList.add("node");
        let para = document.createElement('p');
        para.textContent = this.data;
        n.appendChild(para);

        return n;

    }
    renderArrow() {
        // creating a div
        let arrow = document.createElement('div');
        arrow.classList.add("arrow");
        let line = document.createElement('div');
        line.classList.add("line");
        let pointer = document.createElement('div');
        pointer.classList.add("pointer");
        arrow.appendChild(line);
        arrow.appendChild(pointer)
        return arrow;
    }
}

// Class blueprint to create a Linked List instance.
class LL {
    // creating the start node of this linked list.
    constructor(data) {
        this.startNode = new Node(data);
        let fig = this.startNode.renderNode();

        this.drawing = document.querySelector('#drawings');
        this.drawing.appendChild(fig);


    }

    countNodes() {
        let temp = this.startNode;
        let count = 0;
        while (temp != null) {
            count++;
            temp = temp.next;
        }
        return count;
    }

    // Inserting a new node at position(pos) with data(data).
    insertNode(pos, data) {
        let tempNode = this.startNode;
        // if the position of node is the position of start node of this linked list, create a new node with data and set the new node's next property to the start node and set the start node to this new node.
        if (pos === 1) {
            const newNode = new Node(data);
            newNode.next = this.startNode;
            this.startNode = newNode;

            // displaying node on screen
            let fig = newNode.renderNode();
            let arr = newNode.renderArrow();
            this.drawing.insertBefore(arr, this.drawing.firstElementChild);
            this.drawing.insertBefore(fig, this.drawing.firstElementChild);


            // displaying arrow on the screen



            return;
        }

        // For all other node positions in the linked list
        /*Pseudocode:-
         1) Initialize counter to 1;
         2) If we want to insert node at position, say, 5, then we have to stop our iteration at position 4 i.e. pos-1;
       */
        let counter = 1, countArrow = 1;
        while (counter < pos - 1 && tempNode.next !== null) {

            tempNode = tempNode.next;

            counter++;
        }
        countArrow = counter - 1;
        //3) create a new node with that data and set it's next property to currentNode's next property and then set currentNode's next property to this new node.
        const newNode = new Node(data);
        newNode.next = tempNode.next;
        tempNode.next = newNode;

        // displaying node on screen
        let fig = newNode.renderNode();
        let arr = newNode.renderArrow();
        this.drawing.insertBefore(fig, this.drawing.childNodes[countArrow + counter + 1]);
        this.drawing.insertBefore(arr, this.drawing.children[countArrow + counter]);




    }

    // To insert at beginning of linked list, reuse insertNode for 1st pos.
    insertNodeAtBeg(data) {
        this.insertNode(1, data);
    }

    // To insert at end of linked list, pass a big value like Infinity to iterate untill we reach end of this list.
    insertNodeAtEnd(data) {
        this.insertNode(Infinity, data);
    }

    // To delete either single or multiple nodes that have data matching the passed data based on canDeleteMultiple boolean value.
    deleteNodeWithData(data, canDeleteMultiple = false) {
        // If multiple deletes are not needed.
        if (!canDeleteMultiple) {
            // if the start node of linked list has data that matches the passed data and return.
            if (this.startNode.data === data) {
                this.startNode = this.startNode.next;
                return;
            }
            // Iterate over list until you find the preceding node who's next node data matches the passed data.
            let tempNode = this.startNode;
            while (tempNode.next !== null && tempNode.next.data !== data) {
                tempNode = tempNode.next;
            }
            // if no such node is found, simply return.
            if (tempNode.next === null) {
                return;
            }
            // set the preceding node's next property to the next property of the node to be deleted.
            tempNode.next = tempNode.next.next;

            //If multiple deletes are needed.
        } else {
            // if the start node of linked list has data that matches the passed data.
            if (this.startNode.data === data) {
                this.startNode = this.startNode.next;
            }

            // Iterate over the list until the end and set all the preceding nodes next property to the next property of the nodes to be deleted.
            let tempNode = this.startNode;
            while (tempNode.next !== null) {
                if (tempNode.next.data === data) {
                    tempNode.next = tempNode.next.next;
                    continue;
                }
                tempNode = tempNode.next;
            }
        }
    }

    // To delete the node matching the exact node reference.
    deleteNodeWithReference(node) {
        // If the node to be deleted is the start node.
        if (this.startNode === node) {
            this.startNode = node.next;
            return;
        }
        // iterate over the list until you find the preceding node to the node to be deleted.
        let tempNode = this.startNode;
        while (tempNode.next !== node && tempNode.next !== null) {
            tempNode = tempNode.next;
        }
        // If no such node is found, simply return.
        if (tempNode.next === null) {
            return;
        }

        // set the preceding node's next property to the next property of the node to be deleted.
        tempNode.next = tempNode.next.next;
    }
}

// New linked list with starting node value set to 5
const ll = new LL(5);


// The list of operations performed on this linked list.
const operationsList = [
    ll.insertNodeAtBeg.bind(ll, 6),
    ll.insertNodeAtBeg.bind(ll, 9),
    ll.insertNodeAtEnd.bind(ll, 56),
    ll.insertNode.bind(ll, 6, 424),
    ll.insertNodeAtEnd.bind(ll, 9),
    ll.insertNodeAtBeg.bind(ll, 424),
    ll.insertNodeAtBeg.bind(ll, 9),
    ll.insertNode.bind(ll, 3, 656),
    ll.insertNode.bind(ll, 1, 345),
    ll.deleteNodeWithData.bind(ll, 345),
    ll.deleteNodeWithData.bind(ll, 424),
    ll.deleteNodeWithData.bind(ll, 9),
    ll.insertNodeAtBeg.bind(ll, 9),
    ll.deleteNodeWithData.bind(ll, 9, true)
];

// Function that adds the nodes of a linked list to a document fragment.
function generateNodes(startNode) {
    const df = crDf();
    while (startNode !== null) {
        const nodeContainer = crEl("div");
        const newNode = crEl("div");
        const textNode = crTxt(startNode.data);
        nodeContainer.className = "nodeContainer";
        newNode.className = "node";
        newNode.append(textNode);
        nodeContainer.append(newNode);
        df.append(nodeContainer);
        startNode = startNode.next;
    }
    return df;
}

// Generator function to give next state of the linked list after each operation.
function* genNextStateList() {
    for (let i = 0; i < operationsList.length; i++) {
        operationsList[i]();
        const list = qrSel(`#state${i}`);
        list.append(generateNodes(ll.startNode));
        yield;
    }
}

// The state of current linked list given by generator obejct.
let stateList = genNextStateList();

// Function that triggers on Next State click.
function showNext(event) {
    const { done } = stateList.next();
    if (done) {
        ll.deleteNodeWithReference(ll.startNode.next);
        const list = qrSel(`#state${14}`);
        list.append(generateNodes(ll.startNode));
        event.target.style.pointerEvents = "none";
        event.target.style.cursor = "none";
    }
}


qrSel("#nextBtn").addEventListener("click", showNext);