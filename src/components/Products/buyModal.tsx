"use client"
import useImageSlider from "@/hooks/Products/useImageSlider";
import { ProductImage } from "@/types/Product";
import { useState } from "react";

// const ProductsClient: React.FC<{ detailData: ProductDetail }> = ({ detailData }) => {

const BuyModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
            <button onClick={openModal}>구매하기</button>
            {isOpen && (
                <div className="modal-overlay">
                    {/* 모달 컨텐츠 */}
                    <button onClick={closeModal}>닫기</button>
                </div>
            )}
        </>
    )
}

export default BuyModal;