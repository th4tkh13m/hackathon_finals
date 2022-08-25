import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Input, Form, Tag, Space, Divider, Modal, Alert } from 'antd'
import styled from 'styled-components'
import { ExclamationCircleOutlined, DollarTwoTone } from '@ant-design/icons'
import './DetailNFT.scss'
import { toast } from 'react-toastify'
import { final_be } from '../../../../declarations/final_be'
import { Principal } from '@dfinity/principal'
import { final_be } from '../../../../declarations/final_be'
import { useConnect } from '@connect2ic/react'
import axios from 'axios'
import { Context } from '../../hooks/index'

const { confirm } = Modal

function DetailNFT() {
  const { role } = useContext(Context)
  const [action, setAction] = useState('') // action for viewer : add - remove
  const [isPublic, setPublic] = useState(false) // public-private
  const navigate = useNavigate()
  const { principal } = useConnect()
  const { id } = useParams()
  const [nft, setNft] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  console.log(nft)
  useEffect(() => {
    getNft()
  }, [])

  const getNft = async () => {
    const res = await final_be.getNFT(BigInt(id))
    const price = await final_be.getPrice(BigInt(id))
    setNft({ ...res[0], price: Number(price) })
    setIsLoaded(true)
  }

  const buyNFT = async () => {
    const res = await final_be.buyNFT(BigInt(id))
    console.log(res)
    toast.success('Buy NFT successfully')
    navigate('/my-nfts', { replace: true })
  }

  const showConfirm = () => {
    confirm({
      title: `Buy this NFT with price ${nft?.price}`,
      icon: <DollarTwoTone />,

      onOk() {
        buyNFT()
      },

      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <>
      {isLoaded && (
        <Container className="mt-5">
          <div className="row">
            <div className="col">
              <div className="img_wrapper">
                {true && ( // replace false by uri
                  // <img src="" alt="item" />
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="item"
                  />
                )}
              </div>
            </div>
            <div className="col">
              <Form>
                <Form.Item label="Education">
                  <h1>{nft?.metadata?.center}</h1>
                  <h1>{`NFT #${BigInt(nft?.id)}`}</h1>
                </Form.Item>
                <div className="row">
                  <div className="col">
                    <Form.Item label={`$${nft?.price}`}></Form.Item>
                  </div>
                  <div className="col">
                    {(nft.price !== 0 || role !== 'education') && (
                      <Button type="primary" onClick={showConfirm}>
                        Buy
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

export default DetailNFT
const Container = styled.div`
  .img_wrapper {
    width: 350px;
    height: 350px;
    border-radius: 8px;
    border: 1px dashed #ccc;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`

const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  border: 1px dashed #ccc;
  margin: 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`
