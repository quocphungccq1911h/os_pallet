import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './FAQSection.module.css';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Thời gian đóng pallet gỗ và giao hàng mất bao lâu?",
      a: "Đối với pallet kích thước có sẵn, chúng tôi giao trong vòng 24h. Đối với pallet đóng theo kích thước yêu cầu đơn hàng từ 500 - 2.000 cái, thời gian sản xuất từ 2 - 4 ngày làm việc."
    },
    {
      q: "Xưởng có hỗ trợ cấp chứng thư sấy nhiệt khử trùng ISPM 15 không?",
      a: "Có. Chúng tôi sở hữu hệ thống lò sấy nhiệt HT đạt chuẩn quốc tế. Mọi lô pallet gỗ xuất khẩu đều có dấu mốc niêm phong ISPM 15 và chứng thư khử trùng do cơ quan kiểm dịch thực vật cấp."
    },
    {
      q: "Số lượng đặt hàng tối thiểu (MOQ) là bao nhiêu?",
      a: "Chúng tôi nhận đơn hàng từ 50 pallet đối với quy cách sẵn có và từ 100 pallet đối với hàng đóng theo bản vẽ thiết kế riêng."
    },
    {
      q: "Nên chọn loại gỗ Tràm hay gỗ Keo cho kho vận?",
      a: "Gỗ Tràm có độ dẻo dai, chịu va đập tốt và giá thành tốt hơn, thích hợp cho kho vận hàng nặng. Gỗ Keo nan phẳng, sáng đẹp, ít xơ xước hơn, phù hợp cho pallet xuất khẩu và kho hàng tiêu chuẩn."
    },
    {
      q: "Hình thức thanh toán và hợp đồng B2B như thế nào?",
      a: "Chúng tôi ký hợp đồng mua bán B2B, xuất hóa đơn VAT đầy đủ. Hình thức thanh toán linh hoạt: Tạm ứng 30% khi ký hợp đồng và thanh toán 70% còn lại sau khi nghiệm thu giao hàng."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">
            <HelpCircle size={14} /> CÂU HỎI THƯỜNG GẶP
          </span>
          <h2 className="section-title">Giải Đáp Thắc Mắc Về Pallet Gỗ</h2>
          <p className="section-subtitle">
            Những thắc mắc phổ biến nhất của các quản lý kho và phòng mua hàng B2B khi lựa chọn nhà cung cấp pallet.
          </p>
        </div>

        <div className={styles.accordionContainer}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`${styles.accordionItem} ${openIdx === idx ? styles.activeItem : ''}`}>
              <button className={styles.questionBtn} onClick={() => toggle(idx)}>
                <span className={styles.qText}>{faq.q}</span>
                {openIdx === idx ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} />}
              </button>
              {openIdx === idx && (
                <div className={styles.answerBox}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
