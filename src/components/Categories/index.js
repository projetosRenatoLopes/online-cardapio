import React from "react";
import categs from "../Companny";


export var Categories = () => {



  return (
    <>
      <div className='sel-categ'>
        <div id='btn-categ' className="btn-group" role="group" aria-label="Basic outlined example">
          {Categorias}
        </div>
      </div>
    </>

  )
}

export default Categories


export var Categorias = () => {
  setTimeout(() => {
      for (let i in categs) {
          let parentElement = document.getElementById('categories')
          let theFirstChild = parentElement.firstChild
          console.log(theFirstChild)
          let newElement = document.createElement("button")
          newElement.innerHTML = categs[i];
          parentElement.insertBefore(newElement, theFirstChild)
          //<button type="button" className="btn btn-primary">${categs[i]}</button>)
      }
  }, 1000);
};