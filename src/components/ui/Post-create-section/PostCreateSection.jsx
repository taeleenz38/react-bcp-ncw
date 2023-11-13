// import React from "react";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import "./post-create-section.css";
import Modal from 'react-modal';
import store from '../../../store';
import API from '../../../api';
import React, { useEffect, useState } from "react";
import user0 from '../../../assets/images/user0.png'
import user1 from '../../../assets/images/user1.jpg'
import user2 from '../../../assets/images/user2.jpg'
import user3 from '../../../assets/images/user3.jpg'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '550px',
    backgroundColor: '#120C18',
    color: 'white'
  },
};

store.setState("data", [], { persist: true });

const PostCreateSection = (props) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [referance, setReferance] = React.useState(undefined);
  const [message, setMessage] = React.useState('');
  const [postText, setPostText] = React.useState('');
  const [data, setData] = store.useState("data");
  const [admin, setAdmin] = store.useState("admin");
  const [user, setUser] = store.useState("user");
  const [selectedFile, setSelectedFile] = React.useState()
  const [preview, setPreview] = React.useState()
  const [loginName, setLoginName] = store.useState("loginName");
  const [userId, setUserId] = store.useState("userId");
  const [fullName, setFullName] = store.useState("fullName");
  const image = { "user0": user0, "1": user1, "2": user2, "3": user3 };
  const [imgUrl, setImgUrl] = React.useState();
  // const [imghash, setimgHash] = React.useState('');
  const [img, setImg] = useState('');
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
    const objectUrl = URL.createObjectURL(e.target.files[0])
    setImgUrl(objectUrl);
    console.log(e.target.files[0]);
    console.log(objectUrl, "objectUrl");
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onChangeReferance(event) {
    setReferance(event.target.value);
  }

  function onChangeMessage(event) {
    setMessage(event.target.value);
  }

  function handlePostText(event) {
    setPostText(event.target.value);
  }

  async function postData() {
    var ifpsData = await uploadToIPFS(props);
    var image = ifpsData.imgHash;
    console.log(image, "imageimage")

    let ref;
    let pt;
    if (postText.includes('@')) {
      [ref, ...pt] = postText.split(' ');
      ref = ref.replace(/@/g, "");
      pt = pt.join(' ');
    } else {
      ref = undefined;
      pt = postText;
    }


    console.log("1R = " + ref);
    console.log("1P = " + pt);

    let jsonData = {
      "creatorLN": loginName.toLowerCase(), "creator": fullName, "post": pt, "approved": false, "time": getCurrentDate(),
      "like": true, "dislike": false, "approver": "", "referance": ref, "image": undefined
    };
    console.log(JSON.stringify(jsonData), "Consoled JSON DATA");
    // let jsonData= {"creatorLN": loginName.toLowerCase(), "creator": fullName, "post":message, "approved": false, "time" : getCurrentDate(), 
    // "like": true, "dislike" : false, "approver": "", "referance": referance , "image" :image == undefined ? "null" : image };
    // console.log(JSON.stringify(jsonData), "JSON DATA");
    let newList = data.concat(jsonData);
    console.log(newList);
    setData(newList)
    setIsOpen(false);


    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "title": 'New Post',
      "content": pt,
      "userId": parseInt(userId),
      "referance": ref,
      "creator": fullName,
      "image": ifpsData.imgHash
    }
    console.log(dataSet, "dataSet");
    API.post(`post/create`, dataSet, {
      headers: headers
    });
    console.log(dataSet, "dataSet2");
  }

  // for posting Image
  async function uploadToIPFS(props) {
    console.log("Uploading data to Pinata IPFS .....");
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      const response = await API.post('ipfs/uploadToIpfs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log("Img hash : " + response.data.imgHash);
      setImg(response.data.imgHash);
      var imageHashs = img;
      console.log(imageHashs, "imageHashs");
      return { url: response.data.url, imgHash: response.data.imgHash };
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  function clearData() {
    // store.remove("data", reinitializeDataState)
  }

  const reinitializeDataState = () => {
    store.setState("data", []);
  }

  function postTextData() {

    console.log(postText);
    // let pt = postText;
    // console.log("1P = "+pt);
    // let ref = pt.slice(0, pt.indexOf(' '));
    // console.log("1R = "+ref);
    // if(ref.length < 2){
    //   ref = undefined;
    // } else{
    //   pt.replace(ref.toString(), "")
    //   console.log("2P = "+pt);
    //   ref.replace("@", "")
    //   console.log("2R = "+ref);
    //   ref.trim();
    //   console.log("3R = "+ref);
    // }

    // console.log("4R = "+ref);
    // console.log("3P = "+pt);

    let ref;
    let pt;
    if (postText.includes('@')) {
      [ref, ...pt] = postText.split(' ');
      ref = ref.replace(/@/g, "");
      pt = pt.join(' ');
    } else {
      ref = undefined;
      pt = postText;
    }


    console.log("1R = " + ref);
    console.log("1P = " + pt);

    let jsonData = {
      "creatorLN": loginName.toLowerCase(), "creator": fullName, "post": pt, "approved": false, "time": getCurrentDate(),
      "like": true, "dislike": false, "approver": "", "referance": ref, "image": undefined
    };
    console.log(JSON.stringify(jsonData), "Consoled JSON DATA");
    let newList = data.concat(jsonData);
    console.log(newList);
    setData(newList)
    setPostText('');

    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "title": 'New Post',
      "content": pt,
      "userId": parseInt(userId),
      "referance": ref,
      "creator": fullName
    }
    console.log(dataSet, "dataset in postText")
    API.post(`post/create`, dataSet, {
      headers: headers
    });
  }

  function getCurrentDate() {
    return moment().format("DD-MM-YYYY hh:mm:ss")
  }

  return (
    <section id="post-modal-section" style={{ padding: '0', marginBottom: '20px' }}>
      <Container>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 style={{ color: '#00B7FA' }} ref={(_subtitle) => (subtitle = _subtitle)} id="modal-post">Create a post</h2>
          <div className="modal-post-inputs" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ marginRight: '30px' }}>Reference:</label>
            <input style={{ width: '330px' }} onChange={onChangeReferance} />
          </div>

          <div className="modal-post-inputs" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ marginRight: '35px' }}>Message:</label>
            <input style={{ width: '330px' }} onChange={onChangeMessage} />
          </div>

          <div style={{ marginTop: '30px' }}>
            <input type='file' onChange={onSelectFile} />
            {selectedFile && <div style={{ marginTop: '20px' }}> <img style={{ width: '200px', height: '200px' }} src={preview} /> </div>}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="modal-post-btns" style={{ margin: '25px', width: '100px', borderRadius: '8px', color: 'white', fontWeight: '700', backgroundColor: "#E42575", borderColor: '#E42575' }} onClick={closeModal}>DISCARD</button>

            <button className="modal-post-btns" style={{ margin: '25px', width: '100px', borderRadius: '8px', color: 'white', fontWeight: '700', backgroundColor: "#00B7FA", borderColor: '#00B7FA' }} onClick={postData}>POST</button>
          </div>
        </Modal>
        <Row lg="1" key={1} className="mb-4, main__row__base" style={{ backgroundColor: "#120C18" }}>
          <div className="postCreateContainer" style={{ height: '80px', display: 'flex', backgroundColor: '#120C18', borderRadius: '10px', width: '100%', justifyContent: 'space-between' }}>
            <Col lg="1" key={1} style={{ display: 'flex', alignItems: 'center', height: '80px', width: '80px' }}>
              <div style={{ height: '50px', width: '50px', display: 'flex', alignSelf: 'center' }}>
                <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '50px' }}>
                  {/* <i class={"ri-user-fill"} style={{color:"#3A7CA5", alignSelf:'center', fontSize: '4rem'}}></i> */}
                  <img style={{ width: '70px', height: '60px', borderRadius: '10px' }} src={!user ? user0 : image[userId]} />
                </span>
              </div>
            </Col>

            <Col lg="1" key={1} style={{ display: 'flex', height: '80px', flexGrow: '1' }}>
              <div style={{ height: '60px', width: '100%', display: 'flex', alignSelf: 'center', justifyContent: 'space-around' }}>
                <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '100%', height: '50px', padding: '0' }}>
                  <input className="input" disabled={!user} placeholder="&nbsp;Create Post" style={{ color: "#000", alignSelf: 'center', fontSize: '1.2rem', width: '80%', height: '50px', borderRadius: '10px', borderColor: '#E2E2E2', backgroundColor: "#E2E2E2" }} type='text' onChange={handlePostText} value={postText} />
                  <button style={{ width: '15%', marginLeft: '10px', backgroundColor: '#00B7FA', borderRadius: '10px', borderColor: '#00B7FA' }} disabled={!postText} onClick={postTextData}><text style={{ color: !postText ? '#00B7FA' : '#00B7FA' }}>Post</text></button>
                </span>
              </div>
            </Col>

            <Col lg="1" key={1} style={{ display: 'flex', height: '80px', width: '75px' }}>
              <div style={{ height: '50px', width: '100%', display: 'flex', alignSelf: 'center' }}>
                <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '100%' }}>
                  <i onClick={openModal} class={"ri-image-fill"} style={{ color: "grey", alignSelf: 'center', fontSize: '2rem' }}></i>
                </span>
                <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '100%' }}>
                  <i onClick={clearData} class={"ri-links-fill"} style={{ color: "grey", alignSelf: 'center', fontSize: '2rem' }}></i>
                </span>
              </div>
            </Col>

          </div>
        </Row>

      </Container>
    </section>
  );
};

export default PostCreateSection;
