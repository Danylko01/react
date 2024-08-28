/*
 * @Description: 
 * @Author: Danylko
 * @Date: 2024-08-28 20:41:38
 * @LastEditTime: 2024-08-28 21:25:52
 */
import React from 'react';
import { axiosTest } from './service'
function Home() {
  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    const res = axiosTest("1123");
    console.log("reseee", res)
  }
  return (
    <>
      <h2 onClick={onClick}>展示</h2>
    </>
  )
}
export default Home