<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { storeFiles } from '../../Utils/web3Storage'
import axios from 'axios'

function MintRequest() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    getAllRequests()
  }, [])

  const getAllRequests = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/request')
    setRequests(res.data.request)
  }

  const mintNFT = async () => {
    // name,console.log('Minting')
    // console.log(process.env.IPFS_LINK)
    // const cid = await storeFiles([fileImg])
    // const fileNameImg = fileImg.name
    // const fileName = new Date().getTime().toString()
    // const nFile = new File(
    //   [
    //     JSON.stringify({
    // certificate,
    //       image: `https://${cid}.${process.env.IPFS_LINK}/${fileNameImg}`,
    //     }),
    //   ],
    //   `${fileName}.json`,
    //   { type: 'text/plain' }
    // )
    // const metadataCID = await storeFiles([nFile])
    // Call backend to mint the token
    // const tokenURI = `https://${metadataCID}.${process.env.IPFS_LINK}/${fileName}.json`
    // console.log(tokenURI)
    // const res = await superheroes.mint(Principal.fromText(principal), [
    //   { tokenUri: `${IPFS_LINK}${metadataCID}/${values?.name}.json` },
    // ]);
    // const res = await axios.post(
    //   'http://localhost:5000/api/v1/education-kyc',
    //   formData
    // )
    // // Doing something to notification to user
    // if (res.status === 201) {
    //   console.log('success')
    // } else {
    //   console.log('error')
    // }
    // console.log('Minted')
    // }
  }
  return (
    <div>
      <h1>List request of education page</h1>
      <ul>
        {requests.map(request => {
          console.log(request)
          const { _id, studentID, name, education, certificate, image } =
            request
          return (
            <li key={_id}>
              <h4>Name: {name}</h4>
              <h4>studentID: {studentID}</h4>
              <h4>education: {education.name}</h4>
              <h4>certificate: {certificate}</h4>
              <img
                src={`data:image/${image.contentType};base64,${Buffer.from(
                  image.data
                ).toString('base64')}`}
                alt=""
                width="200"
                height="300"
              />
              <button>Mint NFT</button>
              <button>Reject NFT</button>
            </li>
          )
        })}
      </ul>
=======
import { useEffect, useState } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space } from 'antd';
const columns = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    key: 'studentId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Full Name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    render: (_, { actions }) => (
      <Space size={8}>
        {
          actions.map(action => {
            if (action === "preview") return (
              <Button type="primary" icon={<EyeOutlined />} className="mr-3"></Button>
            )
            else return (
              <Button type="danger" icon={<DeleteOutlined />}></Button>
            )
          })
        }
      </Space >
    )
  },
];
const data = [
  {
    studentId: 'DE160000',
    fullname: 'John Brown',
    timestamp: "07302022",
    actions: ['preview', 'delete'],
  },
  {
    studentId: 'DE160002',
    fullname: 'Jim Green',
    timestamp: "07302022",
    actions: ['preview', 'delete'],
  },
  {
    studentId: 'DE160003',
    fullname: 'Joe Black',
    timestamp: "07302022",
    actions: ['preview', 'delete'],
  },
];

function MintRequest() {
  return (
    <div>
      <h1 className="my-4">MINT REQUESTS</h1>
      <Table columns={columns} dataSource={data} />
>>>>>>> 951b7eebe749d691a2710fedd0cff2d6d01ee171
    </div>
  )
}

export default MintRequest
