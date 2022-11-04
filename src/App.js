import { createElement, useEffect, useState } from 'react';
import './App.css';
import selectIcon from './icon/Toolbar_select.svg'
import boundingIcon from './icon/Bounding_Box_Create.svg'

function App() {
  //placeholder 연결
  useEffect(() => {

    const imgBox = document.querySelector('.imgBox');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://jsonplaceholder.typicode.com/photos", requestOptions)
      .then(response => response.json())
      .then(result => {
        let src = result[Math.floor(Math.random() * result.length)].url;
        imgBox.style.backgroundImage = `url(${src})`;
        imgBox.style.backgroundSize = 'contain'
      })
      .catch(error => console.log('error'.error))
  }, [])
  //placeholder 연결
  const selectLabelEvent = e => {
    change(e);
  }

  //라벨 생성
  let originalX, originalY;
  const makeLabelEvent = e => {
    console.log('눌림')
    change(e);
  }

  //메뉴 선택시 이벤트 추가 및 배경색 변경
  function change(e) {
    const imgBox = document.querySelector('.imgBox');
    //클래스를 확인하여 있으면 이벤트 제거 아니면 추가
    if(e.currentTarget === document.querySelector('.select')){
      if (imgBox.classList.contains('bound')) {
        imgBox.removeEventListener('mousedown', originGrid)
        imgBox.removeEventListener('mouseup', makeLabel)
        imgBox.classList.remove('bound')
        imgBox.classList.add('sel');
        imgBox.addEventListener('click', selectFunc)
      } else if(imgBox.classList.contains('sel')){
        imgBox.removeEventListener('click', selectFunc)
        imgBox.classList.remove('sel')
      }
        else {
        imgBox.classList.add('sel');
         // 이벤트 핸들러 등록
        imgBox.addEventListener('click', selectFunc)
      }
 
    } else {
      if (imgBox.classList.contains('bound') && imgBox.classList.contains('sel') ) {
        imgBox.removeEventListener('click', selectFunc)
        imgBox.classList.remove('sel')
      } else if(imgBox.classList.contains('bound')){
        imgBox.removeEventListener('mousedown', originGrid)
        imgBox.removeEventListener('mouseup', makeLabel)
        imgBox.classList.remove('bound')
      } else {
        imgBox.classList.add('bound');
         // 이벤트 핸들러 등록
         imgBox.addEventListener('mousedown', originGrid)
         imgBox.addEventListener('mouseup', makeLabel)
      }
    }
    //메뉴 배경색 변경
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

  //초기 좌표
  const originGrid = e => {
    originalX = e.clientX
    originalY = e.clientY
  }
  //초기 좌표
  //초기 좌표에서 마우스 클릭된 좌표와의 차이로 생성됨
  const makeLabel = e => {
    const imgBox = document.querySelector('.imgBox');
    if (e.pageX - originalX != 0 && e.pageY - originalY != 0) {
      const boundingBox = document.createElement('div');
      boundingBox.className = 'boundingBox';
      boundingBox.style.backgroundColor = 'rgb(86, 104, 217, .2)';
      boundingBox.style.position = 'absolute';
      boundingBox.style.width = e.pageX - originalX + 'px'; boundingBox.style.height = e.pageY - originalY + 'px';
      boundingBox.style.marginTop = ((parseInt(originalY)-64)*100)/document.body.clientHeight + 'vh'; boundingBox.style.marginLeft = ((parseInt(originalX)-56)*100)/document.body.clientWidth + 'vw';
      boundingBox.style.zIndex = '1'
      imgBox.appendChild(boundingBox)
    }


  }
  //초기 좌표에서 마우스 클릭된 좌표와의 차이로 생성됨
  //라벨 생성

  //라벨 선택기능
  let originalTop, originalLeft, diffTop, diffWidth, height, width
  const selectFunc = e => {
    const imgBox = document.querySelector('.imgBox');
    if (e.target.className == 'boundingBox') {

      console.log((parseInt(e.target.style.width) - 48) / 3)
      e.target.style.border = '3px solid #5668D9'
      e.target.draggable = 'true';
      e.target.className = 'selectLabel'
      e.target.style.display = 'flex'
      //앵커생성
      for (let i = 0; i < 3; i++) {
        const anchor = document.createElement('div')
        anchor.style.position = 'absolute'; anchor.style.top = ' -12px';
        anchor.className = 'anchor';
        anchor.style.left = ' -12px';
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
        anchor.className = 'anchor';
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
        anchor.style.left = ' -12px';
        anchor.className = 'anchor';
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
    //라벨 이동 기능
    e.target.addEventListener('dragstart', e => {
      originalTop = parseInt(e.target.style.marginTop)
      originalLeft = parseInt(e.target.style.marginLeft)
    })
    e.target.addEventListener('dragend', e => {

      if (originalTop < e.clientY) {
        diffTop = e.clientY - originalTop;
        diffWidth = e.clientX - originalLeft;
        width = (originalLeft + diffWidth) - 56;
        height = (originalTop + diffTop) - 64;
        console.log(originalLeft + diffWidth)
      } else {
        diffTop = originalTop - e.clientY;
        diffWidth = originalLeft - e.clientX;
        width = (originalLeft - diffWidth) - 56;
        height = (originalTop - diffTop)- 64;
        console.log(diffTop)
      }
      if((height*100)/document.body.clientHeight < 0){
        e.target.style.marginTop =  0 + 'vh';
      } else if ((height*100)/document.body.clientHeight <= 94.074) {
        e.target.style.marginTop = (height*100)/document.body.clientHeight + 'vh';
      }
      if((width*100)/document.body.clientWidth < 0 ){
        e.target.style.marginLeft = 0 + 'vw'
      } else {
        e.target.style.marginLeft = (width*100)/document.body.clientWidth + 'vw';
      }
     
    })
    //라벨 이동 기능

  }
  //라벨 선택기능


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
