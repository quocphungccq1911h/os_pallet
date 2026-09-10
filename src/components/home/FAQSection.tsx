import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './FAQSection.module.css';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Xưởng có nhận gia công mẫu pallet để kiểm tra và test tải trước khi đặt đơn lớn không?",
      a: "Có. Đối với các đơn hàng theo bản vẽ kỹ thuật hoặc đơn hàng xuất khẩu số lượng lớn, Xưởng Pallet Trường An sẵn sàng gia công mẫu thực tế để quý khách đo đạc, kiểm tra độ sắc nét, kết cấu đinh xoắn và test tải trọng thực tế tận kho trước khi chính thức ký hợp đồng sản xuất."
    },
    {
      q: "Xưởng có dịch vụ cử thợ xuống tận nơi lắp ráp thùng gỗ đóng máy móc không?",
      a: "Có. Chúng tôi có đội thợ mộc cơ động chuyên nghiệp trực tiếp xuống tận kho xưởng/nhà máy của khách hàng tại TP.HCM, Bình Dương, Đồng Nai, Long An... mang theo vật tư, súng bắn đinh để đo đạc chèn lót máy móc và lắp ráp thùng gỗ kiên cố kịp tiến độ đóng hàng lên container trong ngày."
    },
    {
      q: "Xuất khẩu hàng hóa nên chọn Pallet Gỗ Thông sấy HT hay Pallet Ván Ép Plywood?",
      a: "Tùy thuộc vào yêu cầu của hàng hóa: Pallet Ván Ép Plywood có mặt phẳng mịn, không mùn gỗ, trọng lượng nhẹ và được miễn thủ tục hun trùng kiểm dịch tại hầu hết các cảng quốc tế (rất tối ưu cho hàng air và xuất nhanh). Pallet Gỗ Thông sấy HT thớ gỗ sáng đẹp, đinh xoắn liên kết chịu lực cực cao (1.5 - 3.5 tấn), được khử trùng nhiệt HT đóng mộc dấu ISPM 15 đạt chuẩn thông quan Mỹ, Châu Âu, Nhật Bản, Hàn Quốc."
    },
    {
      q: "Pallet xuất khẩu tại Trường An có đầy đủ chứng thư kiểm dịch ISPM 15 không?",
      a: "Có đầy đủ 100%. Mọi lô pallet gỗ xuất khẩu đều được xử lý nhiệt HT (Heat Treatment) đúng quy chuẩn quốc tế, kiểm soát độ ẩm dưới 20%, đóng mộc niêm phong ISPM 15 sắc nét và cấp đầy đủ giấy chứng thư kiểm dịch thực vật phục vụ thông quan nhanh chóng tại hải quan."
    },
    {
      q: "Thời gian sản xuất và tiến độ giao hàng của xưởng như thế nào?",
      a: "Với quy cách có sẵn, xưởng giao ngay trong 24 giờ bằng đội xe tải riêng. Với đơn hàng gia công theo bản vẽ hoặc cần chạy deadline đóng cont gấp, xưởng sẵn sàng bố trí tăng ca linh động để kịp giờ xe container và lịch tàu xuất cảng của khách hàng."
    },
    {
      q: "Quy trình đặt hàng, xuất hóa đơn VAT và chính sách bảo hành ra sao?",
      a: "Xưởng Pallet Trường An ký hợp đồng mua bán B2B pháp nhân đầy đủ, xuất hóa đơn VAT điện tử hợp lệ. Hỗ trợ chính sách công nợ linh hoạt cho doanh nghiệp hợp tác định kỳ. Cam kết 1 đổi 1 ngay lập tức nếu sản phẩm phát hiện sai lệch quy cách bản vẽ hoặc bị lỗi sứt mẻ trong quá trình giao hàng."
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
          <h2 className="section-title">Giải Đáp Thắc Mắc Khách Hàng B2B</h2>
          <p className="section-subtitle">
            Những giải đáp thực tế và chính sách cam kết từ Xưởng Pallet & Thùng Gỗ Trường An giúp doanh nghiệp an tâm hợp tác.
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
