import { createElement, useEffect, useState } from 'react';
import './App.css';
import selectIcon from './icon/Toolbar_select.svg'
import boundingIcon from './icon/Bounding_Box_Create.svg'


function App() {
  let image = document.createElement('img')
  //placeholder 연결
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://jsonplaceholder.typicode.com/photos", requestOptions)
      .then(response => response.json())
      .then(result => {
        image.src = result[Math.floor(Math.random() * result.length)].url;
        image.style.position = 'relative'; image.draggable = false;
        document.querySelector('.imgBox').appendChild(image);
      })
      .catch(error => console.log('error'.error))
  }, [])
  //placeholder 연결
  const selectLabelEvent = e => {
    changeColor(e);
    document.querySelector('.imgBox').addEventListener('click', selectFunc)
    document.querySelector('.imgBox').removeEventListener('mousedown', originGrid)
    document.querySelector('.imgBox').removeEventListener('mouseup', makeLabel)

  }


  //라벨 생성
  let originalX, originalY;
  const makeLabelEvent = e => {
    changeColor(e);
    document.querySelector('.imgBox').removeEventListener('click', selectFunc)
    document.querySelector('.imgBox').addEventListener('mousedown', originGrid)
    document.querySelector('.imgBox').addEventListener('mouseup', makeLabel)
  }
  //초기 좌표
  const originGrid = e => {
    originalX = e.clientX
    originalY = e.clientY
  }
  //초기 좌표
  //초기 좌표에서 마우스 클릭된 좌표와의 차이로 생성됨
  const makeLabel = e => {

    if (e.pageX - originalX != 0 && e.pageY - originalY != 0) {
      const boundingBox = document.createElement('div');
      boundingBox.className = 'boundingBox';
      boundingBox.style.backgroundColor = 'rgb(86, 104, 217, .2)';
      boundingBox.style.position = 'absolute';
      boundingBox.style.width = e.pageX - originalX + 'px'; boundingBox.style.height = e.pageY - originalY + 'px';
      boundingBox.style.top = originalY + 'px'; boundingBox.style.left = originalX + 'px';
      boundingBox.style.zIndex = '1'
      document.querySelector('.imgBox').appendChild(boundingBox)
    }


  }
  //초기 좌표에서 마우스 클릭된 좌표와의 차이로 생성됨
  //라벨 생성

  //라벨 선택기능
  let originalTop, originalLeft, diffTop, diffWidth, height, width
  const selectFunc = e => {
    if (e.target.className == 'boundingBox') {

      console.log((parseInt(e.target.style.width) - 48) / 3)
      e.target.style.border = '3px solid #5668D9'
      e.target.draggable = 'true';
      e.target.className = 'selectLabel'
      e.target.style.display = 'flex'
      //앵커생성
      for (let i = 0; i < 3; i++) {
        const anchor = document.createElement('div')
        anchor.style.position = 'absolute'; anchor.style.top = ' -12px'
        anchor.style.left = ' -12px'
        anchor.style.width = '16px'; anchor.style.height = '16px';
        anchor.style.padding = '0'
        if (i == 1) {
          anchor.style.left = (parseInt(e.target.style.width) - 21.96) / 2 + 'px';
        }
        if (i == 2) {
          anchor.style.left = parseInt(e.target.style.width) - 9 + 'px';
        }
        anchor.style.border = '3px solid #5668D9'; anchor.style.backgroundColor = 'white'
        e.target.appendChild(anchor)
      }
      for (let i = 0; i < 2; i++) {
        const anchor = document.createElement('div')
        anchor.style.position = 'absolute'; anchor.style.top = (parseInt(e.target.style.height) - 21.96) / 2 + 'px';
        anchor.style.left = ' -12px';
        anchor.style.width = '16px'; anchor.style.height = '16px';
        anchor.style.padding = '0'
        if (i == 0) {
          anchor.style.top = (parseInt(e.target.style.height) - 21.96) / 2 + 'px';
          anchor.style.left = parseInt(e.target.style.width) - 9 + 'px';
        }
        anchor.style.border = '3px solid #5668D9'; anchor.style.backgroundColor = 'white'
        e.target.appendChild(anchor)
      }
      for (let i = 0; i < 3; i++) {
        const anchor = document.createElement('div')
        anchor.style.position = 'absolute'; anchor.style.top = anchor.style.top = (parseInt(e.target.style.height) - 12) + 'px';
        anchor.style.left = ' -12px'
        anchor.style.width = '16px'; anchor.style.height = '16px';
        anchor.style.padding = '0'
        if (i == 1) {
          anchor.style.left = (parseInt(e.target.style.width) - 21.96) / 2 + 'px';
        }
        if (i == 2) {
          anchor.style.left = parseInt(e.target.style.width) - 9 + 'px';
        }
        anchor.style.border = '3px solid #5668D9'; anchor.style.backgroundColor = 'white'
        e.target.appendChild(anchor)
      }
      //앵커생성
    }

    //delete키 눌렀을 때 라벨링 박스 삭제
    window.addEventListener('keydown', e => {
      if (e.keyCode === 46) {
        document.querySelectorAll('.selectLabel').forEach(selectLabel => {
          selectLabel.remove();
        })
      }
    })
    //delete키 눌렀을 때 라벨링 박스 삭제
    e.target.addEventListener('dragstart', e => {
      originalTop = parseInt(e.target.style.top)
      originalLeft = parseInt(e.target.style.left)


      console.log(originalTop)
    })
    e.target.addEventListener('dragend', e => {

      console.log(e.clientY)

      if (originalTop < e.clientY) {
        diffTop = e.clientY - originalTop;
        diffWidth = e.clientX - originalLeft
        width = originalLeft + diffWidth;
        height = originalTop + diffTop;
        console.log(diffTop)
      } else {
        diffTop = originalTop - e.clientY;
        diffWidth = originalLeft - e.clientX;
        width = originalLeft - diffWidth;
        height = originalTop - diffTop;
        console.log(diffTop)
      }

      console.log(height)

      e.target.style.top = height + 'px';
      e.target.style.left = width + 'px';
    })


  }
  //라벨 선택기능

  //메뉴 선택시 배경색 바뀌게 하는 코드
  function changeColor(e) {
    if (e.currentTarget.style.backgroundColor) {
      e.currentTarget.style.backgroundColor = null;
      e.currentTarget.style.borderRadius = null;
    } else {
      if (e.currentTarget === document.querySelector('.select')) {

        e.currentTarget.nextSibling.style.backgroundColor = null;
        e.currentTarget.nextSibling.style.borderRadius = null;
      } else if (e.currentTarget === document.querySelector('.bounding')) {
        e.currentTarget.previousSibling.style.backgroundColor = null;
        e.currentTarget.previousSibling.style.borderRadius = null;
      }
      e.currentTarget.style.backgroundColor = '#D5D9E2';
      e.currentTarget.style.borderRadius = '5px';
    }
  }
  //메뉴 선택시 배경색 바뀌게 하는 코드

  return (
    <div className="App">
      <div className='header'>
        <h1>Dataset Label</h1>
      </div>
      <div className='body'>
        <div className='menu'>
          <div className='select' onClick={selectLabelEvent}><img src={selectIcon} /></div>
          <div className='bounding' onClick={makeLabelEvent}><img src={boundingIcon} /></div>
        </div>
        <div className='imgBox'></div>
      </div>


    </div>
  );
}

export default App;
