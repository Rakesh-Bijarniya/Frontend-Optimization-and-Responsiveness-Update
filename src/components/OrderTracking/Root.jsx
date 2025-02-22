import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import BreadCrumbs from "../MyOrders/components/modal/BreadCrumbs";
import img from "./image.png";
import cancelImg from "./cancelmodal.png";

import ProductDetail from "./components/ProductDetail";
import ReturnForm from "./components/ReturnForm";
import Tracker from "./components/Tracker";
import DeliveryInfo from "./components/DeliveryInfo";
import OrderSummary from "./components/OrderSummary";
import CancelModal from "./components/modal/CancelModal";
import { get } from "../../services";
import { IN_ORDERS, IN_PRODUCT, IN_URL } from "../../BaseUrl";
import { toast } from "react-toastify";

const OrderTracking = () => {
  const location = useLocation();
  const {orderId,orderCode}=useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isCancelledModalOpen, setIsCancelledModalOpen] = React.useState(false);

  const [isCancelled, setIsCancelled] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);//API Handling needed 
  const [orderDetails, setOrderDetails] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  


  //stepper active step, change this value to see different steps
  const [activeStep, setActiveStep] = useState(isDelivered ? 3 : 0);

  const isReturn = location.pathname === "/return";

  const data = {
    product: {
      brand: "SAMSUNG",
      name: "SAMSUNG Galaxy F05 - Twilight Blue (64 GB, 4 GB RAM)",
      price: "11,139.33",
      discount: "35% off",
      img: img,
    },
    trackingData: {
      orderId: "3354-6546-5452",
      orderConfirmedDate: "Dec 24, 2024",
      estimatedDelivery: "Dec 30, 2024",
      orderConfirmedDay: "Tue, 24th Dec",
      orderConfirmedTime: "6:12 AM",
      expectedBy: "Mon 30th",
      orderConfirmedWithYear: "Tue, 24th Dec '24",
      sellerMsg: "Seller has processed your order",
      pickupData: "Wed, 25th Dec '24 - 7:05pm",
      shippedData: "Wed, 25th Dec '24 - 8:12pm",
      shippedDay: "Sun, 15th Sep '24",
      shippedMsg: "Order ID or pick up ID - Your item has been shipped.",
      delieveryExpected: "Thu 19th Sep",
    },
    deliveryInfo: {
      address: "847 Jewess Bridge Apt.",
      city: "174 London",
      country: "UK",
      phone: "474-769-3919",
      mobile: "7766449345",
    },
    summary: {
      mrp: 13349.54,
      discount: 20,
      delivery: 0,
      tax: 149.54,
      total: 11139.33,
    },
  };

  useEffect(()=>{
    get(IN_ORDERS+"track-order/"+orderId).then((res)=>{
      const {data}=res;
      if(data?.trackingStatus?.data?.status==='cancelled'){
        setIsCancelled(true);
      }
      setOrderDetails(data);
      setProductId({
        product_id:data?.order_details?.product_id,
        variant_id:data?.order_details?.product_variant_id,
      });

    }).catch((e)=>{
      // toast.error("Order not found")
    })
  },[])

  useEffect(()=>{
  
      if(productId){
        get(IN_PRODUCT+'/get-product-details/'+productId.product_id).then((res)=>{
          const {data}=res;

          setProductDetails({
            ...data,
            variantId:productId.variant_id,
          });

          // const imageUrl=PROD_IMG_FUNC(data.User.secure_id);
          // setImgPath(imageUrl);
          // setVariant(productVariantArrangement(data.ProductVariants));
          // setImage(imageUrl+data.thumbnail_image_url);
        }).catch((e)=>{
          // toast.error("Product not found");
          // console.log("error in product details page",e);
        });
  
      }
  
    },[productId]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={{ xs: 2, md: 2 }}>
        <BreadCrumbs isReturn={isReturn} />
        {isMobile ? (
          <Stack spacing={1}>
            <ProductDetail product={productDetails} />
            {isReturn ? (
              <ReturnForm trackingData={data.trackingData} />
            ) : (
              <>
                <Tracker
                  trackingData={data.trackingData}
                  isCancelled={isCancelled}
                  isDelivered={isDelivered}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  orderDetails={orderDetails}
                  trackingStatus={orderDetails?.trackingStatus?.data}
                />
                <Divider />
                <DeliveryInfo
                  deliveryInfo={orderDetails?.order_details?.user_address}
                  isCancelled={isCancelled}
                  setIsCancelledModalOpen={setIsCancelledModalOpen}
                  isDelivered={isDelivered}
                  onNotHappy={() => navigate("/return")}
                />
                <Divider />
                <OrderSummary summary={orderDetails?.order_details} />
              </>
            )}
          </Stack>
        ) : (
          <Box sx={{ display: "flex", gap: { md: 2, lg: 3 } }}>
            <Box
              sx={{
                width: { md: "35%", lg: "30%" },
                minWidth: { md: "300px" },
              }}
            >
              <ProductDetail product={productDetails} />
            </Box>
            <Stack spacing={1} sx={{ flex: 1 }}>
              {isReturn ? (
                <ReturnForm trackingData={data.trackingData} />
              ) : (
                <>
                  <Tracker
                    trackingData={data.trackingData}
                    isCancelled={isCancelled}
                    isDelivered={isDelivered}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    trackingStatus={orderDetails?.trackingStatus?.data}
                    isMobile={isMobile}
                  />
                  <DeliveryInfo
                    deliveryInfo={orderDetails?.order_details?.user_address}
                    isCancelled={isCancelled}
                    setIsCancelledModalOpen={setIsCancelledModalOpen}
                    isDelivered={isDelivered}
                    onNotHappy={() => navigate("/return")}
                  />
                  <OrderSummary summary={orderDetails?.order_details} />
                </>
              )}
            </Stack>
          </Box>
        )}
      </Stack>
      <CancelModal
        orderId={orderDetails?.order_details?.product_order_code}
        productOrderId={orderId}
        open={isCancelledModalOpen}
        onClose={() => setIsCancelledModalOpen(false)}
        // onConfirm={() => {
        //   setIsCancelledModalOpen(false);
        //   setIsCancelled(true);
        // }}
        setIsCancelledModalOpen={setIsCancelledModalOpen}
        setIsCancelled={setIsCancelled}
        cancelImg={cancelImg}
      />
    </Container>
  );
};

export default OrderTracking;
