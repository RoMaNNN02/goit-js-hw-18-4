document.querySelector(".student");let t=document.querySelector("#body");fetch("http://localhost:4829/students").then(t=>{if(!t.ok)throw Error(`Помилка: ${t.statusText}`);return t.json()}).then(e=>{var o;o=e,t.innerHTML="",o.forEach(e=>{let o=`
    <tr>
      <td>${e.id}</td>
      <td>${e.name}</td>
           <td>${e.age} років</td>
      <td>${e.course}</td>
      <td>${e.skils}</td>
      <td>${e.email}</td>
      <td>${e.status}</td>
      // <td>${e.actions}</td>

 
      <td>
        <button class="delete-btn" data-id="${e.id}">Видалити</button>
      </td>
      </tr>
    `;t.insertAdjacentHTML("beforeend",o)})}).catch(t=>console.error(t)).then(t=>console.log(t)),document.querySelector(".delete-btn"),t.addEventListener("click",t=>{if(t.target.classList.contains("delete-btn")){var e;(e=t.target.dataset.id,fetch(`http://localhost:4829/students/${e}`,{method:"DELETE"}).then(t=>{if(!t.ok)throw Error(`Error: ${t.statusText}`);return t.json()}).catch(t=>console.error(t))).then(t=>console.log(t))}});
//# sourceMappingURL=goit-js-hw-18-4.45317eb7.js.map
