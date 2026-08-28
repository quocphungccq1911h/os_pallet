import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './ContactFormSection.module.css';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dimensions: '',
    quantity: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className={styles.section} id="lien-he">
      <div className="container">
        <div className={styles.grid}>
          {/* Contact Info Side */}
          <div className={styles.infoSide}>
            <span className="section-tag" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}>
              NHẬN BÁO GIÁ TẬN XƯỞNG
            </span>

            <h2 className={styles.title}>Liên Hệ Tư Vấn & Nhận Mẫu Pallet Thử Nghiệm</h2>
            <p className={styles.desc}>
              Điền thông tin vào form hoặc gọi trực tiếp Hotline để kỹ sư của chúng tôi khảo sát tải trọng và gửi báo giá chi tiết trong 15 phút.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.contactCard}>
                <Phone size={22} color="var(--primary)" />
                <div>
                  <strong>Hotline / Zalo Báo Giá 24/7</strong>
                  <p><a href={`tel:${companyInfo.hotline}`} className={styles.hotlineLink}>{companyInfo.hotlineFormatted}</a></p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <Mail size={22} color="var(--primary)" />
                <div>
                  <strong>Email Phòng Kinh Doanh</strong>
                  <p>{companyInfo.email}</p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <MapPin size={22} color="var(--primary)" />
                <div>
                  <strong>Địa Chỉ Trụ Sở & Xưởng</strong>
                  <p>{companyInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.formCard}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>Form Yêu Cầu Báo Giá Bản Vẽ</h3>
                <p className={styles.formSub}>Nhận ưu đãi giảm 5% cho đơn hàng khởi tạo đầu tiên</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Anh/Chị Nam..."
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Số điện thoại / Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      className={styles.input}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kích thước Pallet dự kiến</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 1200 x 1000 x 140 mm"
                      className={styles.input}
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Số lượng (Cái)</label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 200"
                      className={styles.input}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                  <label className={styles.label}>Yêu cầu quy cách / Ghi chú kỹ thuật</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả hàng hóa kê lên, tải trọng yêu cầu hoặc có cần khử trùng ISPM 15 không..."
                    className={styles.textarea}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem' }}>
                  <Send size={18} />
                  <span>GỬI YÊU CẦU BÁO GIÁ NGAY</span>
                </button>
              </form>
            ) : (
              <div className={styles.successState}>
                <CheckCircle size={60} color="var(--accent)" />
                <h3>Gửi Thông Tin Thành Công!</h3>
                <p>Kỹ sư của <strong>{companyInfo.shortName}</strong> đã nhận được thông tin và sẽ gọi báo giá lại cho bạn ngay lập tức.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                  Gửi thêm yêu cầu khác
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
