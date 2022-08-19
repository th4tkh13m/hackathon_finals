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
    //
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
              <h3>Name: {name}</h3>
              <h3>studentID: {studentID}</h3>
              <h3>education: {education.name}</h3>
              <h3>certificate: {certificate}</h3>
              <img
                src={`data:image/${image.contentType};base64,${Buffer.from(
                  image.data
                ).toString('base64')}`}
                alt=""
                width="200"
                height="300"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MintRequest
