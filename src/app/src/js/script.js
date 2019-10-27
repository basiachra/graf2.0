module.exports = {
  submit: async () => {
    //  document.getElementById('create').classList.remove("show");
    //  document.getElementById('form').classList.remove("show");
    // // const drawGraph = require('../../dataparse/excelToJson');
    //  //const headers = await drawGraph.parseDataFromExcelToJson(true);
    //
    //  await document.getElementById('nodeNames').classList.add("show");
    //
    //  let select = document.getElementsByClassName('headers');
    //  for(let item of select) {
    //      headers.forEach((items) => {
    //          let el = document.createElement("option");
    //          el.textContent = items;
    //          el.value = items;
    //          item.appendChild(el);
    //      });
    //  };
    //  console.log(select);
    //
    //  drawGraph.parseDataFromExcelToJson();
  },
  importFiles: async function importFile() {

      const { ipcRenderer } = require('electron');

      let photo = document.getElementById("fileInput").files[0]; // file from input
      document.getElementById("fileName").innerText = photo.name; // file from input

      const drawGraph = require("../../dataparse/excelToJson");
      const headers = drawGraph.parseDataFromExcelToJson(true, await photo.path);
      console.log(headers);

      let select = document.getElementById('headers');

      headers.forEach(items => {
          let el = document.createElement("p");
          el.addEventListener('click', () => {
              el.classList.toggle("selected")
          });
          el.textContent = items;
          el.value = items;
          select.appendChild(el);
      });


      document.getElementById("name").addEventListener('click', () => {
          let selected = document.getElementsByClassName('selected');
          for(let item of selected){
            item.classList.toggle("selected");
            item.classList.toggle("name");
            item.parentNode.removeChild(item);
            document.getElementById("nodeName").appendChild(item);
          }
      });
      document.getElementById("props").addEventListener('click', () => {
          let selected = document.getElementsByClassName('selected');
          for(let item of selected){
            item.classList.toggle("selected");
            item.classList.toggle("props");
            item.parentNode.removeChild(item);
            document.getElementById("nodeProps").appendChild(item);
          }
      });
      document.getElementById("edge").addEventListener('click', () => {
          let selected = document.getElementsByClassName('selected');
          for(let item of selected){
            item.classList.toggle("selected");
            item.classList.toggle("edge");
            item.parentNode.removeChild(item);
            document.getElementById("nodeEdge").appendChild(item);
          }
      });

      document.getElementById("back").addEventListener('click', () => {
          let selected = document.getElementsByClassName('selected');
          for(let item of selected){
            item.classList.toggle("selected");
            item.parentNode.removeChild(item);
            document.getElementById("headers").appendChild(item);
          }
      });

      document.getElementById("save").addEventListener('click', () => {
        const nodes=[];
        const props=[];
        const edges=[];

          let selected = document.getElementsByClassName('name');
          for(let item of selected){
              nodes.push(item.innerHTML);
          }
          selected = document.getElementsByClassName('props');
          for(let item of selected){
              props.push(item.innerHTML);
          }
          selected = document.getElementsByClassName('edge');
          for(let item of selected){
              edges.push(item.innerHTML);
          }

          console.log(photo);

          document.getElementById("save").addEventListener("click", () => {
              ipcRenderer.send('save', [photo.path ,nodes,props,edges]);
          }, false);
      });
  }
};
