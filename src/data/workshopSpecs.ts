export interface WorkshopSpecRow {
  code: string;
  name: string;
  dimensions: string;
  structure: string;
  topDeck: string;
  support: string;
  bottomDeck: string;
  note?: string;
}

/**
 * 20 mẫu Pallet Gỗ Tràm chuẩn xưởng Pallet Trường An (từ sheet Danh_muc_20_mau)
 * Gồm 10 mẫu 3 gánh (nâng 2 hướng) và 10 mẫu 9 gù (nâng 4 hướng)
 */
export const PALLET_TRAM_SPECS: WorkshopSpecRow[] = [
  { code: 'PTA-T01', name: 'Pallet tràm đố bằng phổ thông', dimensions: '1200 × 1000 × 120 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (1200×90×17)', support: '3 gánh dọc cao 86mm', bottomDeck: '3 thanh (1200×90×17)', note: 'Phổ thông lưu kho & xuất xưởng' },
  { code: 'PTA-T02', name: 'Pallet tràm đố bằng xuất khẩu', dimensions: '1200 × 1000 × 140 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (1200×90×18)', support: '3 gánh dọc cao 104mm', bottomDeck: '3 thanh (1200×90×18)', note: 'Hỗ trợ hun trùng ISPM 15' },
  { code: 'PTA-T03', name: 'Pallet tràm 1219×1016 (Chuẩn Mỹ)', dimensions: '1219 × 1016 × 145 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (1219×100×18)', support: '3 gánh dọc cao 109mm', bottomDeck: '3 thanh (1219×100×18)', note: 'Chuẩn xuất khẩu Mỹ (48×40 inch)' },
  { code: 'PTA-T04', name: 'Pallet tràm 1100×1000', dimensions: '1100 × 1000 × 110 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (1100×90×16)', support: '3 gánh dọc cao 78mm', bottomDeck: '3 thanh (1100×90×16)', note: 'Gọn nhẹ tối ưu chi phí' },
  { code: 'PTA-T05', name: 'Pallet tràm 1100×1100', dimensions: '1100 × 1100 × 140 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '8 nan (1100×90×18)', support: '3 gánh dọc cao 104mm', bottomDeck: '3 thanh (1100×90×18)', note: 'Chuẩn vuông Châu Á / Nhật - Hàn' },
  { code: 'PTA-T06', name: 'Pallet tràm 1200×800', dimensions: '1200 × 800 × 120 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '6 nan (1200×90×17)', support: '3 gánh dọc cao 86mm', bottomDeck: '3 thanh (1200×90×17)', note: 'Chuẩn kích thước Euro' },
  { code: 'PTA-T07', name: 'Pallet tràm 1170×1080', dimensions: '1170 × 1080 × 140 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '8 nan (1170×90×18)', support: '3 gánh dọc cao 104mm', bottomDeck: '3 thanh (1170×90×18)', note: 'Chuyên hàng carton công nghiệp' },
  { code: 'PTA-T08', name: 'Pallet tràm 1260×1005', dimensions: '1260 × 1005 × 143 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (1260×100×18)', support: '3 gánh dọc cao 107mm', bottomDeck: '3 thanh (1260×100×18)', note: 'Bản nan rộng 100mm chịu tải tốt' },
  { code: 'PTA-T09', name: 'Pallet tràm 1550×1000', dimensions: '1550 × 1000 × 127 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (1550×90×17)', support: '3 gánh dọc cao 93mm', bottomDeck: '3 thanh (1550×90×17)', note: 'Khổ dài cho hàng cồng kềnh' },
  { code: 'PTA-T10', name: 'Pallet tràm 820×980', dimensions: '820 × 980 × 127 mm', structure: '3 gánh / nâng 2 hướng', topDeck: '7 nan (820×90×17)', support: '3 gánh dọc cao 93mm', bottomDeck: '3 thanh (820×90×17)', note: 'Khổ nhỏ kê linh kiện & kho hẹp' },
  { code: 'PTA-G01', name: 'Pallet tràm 9 gù 1200×1000 (nan 90)', dimensions: '1200 × 1000 × 140 mm', structure: '9 gù / nâng 4 hướng', topDeck: '7 nan (1200×90×18)', support: '9 gù (90×90×104)', bottomDeck: '3 thanh (1200×90×18)', note: 'Nâng 4 hướng linh hoạt' },
  { code: 'PTA-G02', name: 'Pallet tràm 9 gù 1100×1100', dimensions: '1100 × 1100 × 140 mm', structure: '9 gù / nâng 4 hướng', topDeck: '8 nan (1100×90×18)', support: '9 gù (90×90×104)', bottomDeck: '3 thanh (1100×90×18)', note: 'Chuẩn vuông nâng 4 hướng' },
  { code: 'PTA-G03', name: 'Pallet tràm 9 gù 1200×1000 (nan 100)', dimensions: '1200 × 1000 × 140 mm', structure: '9 gù / nâng 4 hướng', topDeck: '7 nan (1200×100×18)', support: '9 gù (90×90×104)', bottomDeck: '3 thanh (1200×90×18)', note: 'Nan mặt bản 100mm cứng vững' },
  { code: 'PTA-G04', name: 'Pallet tràm 9 gù 1219×1016', dimensions: '1219 × 1016 × 145 mm', structure: '9 gù / nâng 4 hướng', topDeck: '7 nan (1219×100×18)', support: '9 gù (90×90×109)', bottomDeck: '3 thanh (1219×90×18)', note: 'Xuất khẩu Mỹ nâng 4 hướng' },
  { code: 'PTA-G05', name: 'Pallet tràm 9 gù 1100×1000', dimensions: '1100 × 1000 × 120 mm', structure: '9 gù / nâng 4 hướng', topDeck: '7 nan (1100×90×17)', support: '9 gù (90×90×86)', bottomDeck: '3 thanh (1100×90×17)', note: 'Chiều cao 120mm gọn kho' },
  { code: 'PTA-G06', name: 'Pallet tràm 9 gù 1200×800', dimensions: '1200 × 800 × 120 mm', structure: '9 gù / nâng 4 hướng', topDeck: '6 nan (1200×90×17)', support: '9 gù (90×90×86)', bottomDeck: '3 thanh (1200×90×17)', note: 'Chuẩn Euro 4 hướng nâng' },
  { code: 'PTA-G07', name: 'Pallet tràm 9 gù 1260×1005', dimensions: '1260 × 1005 × 143 mm', structure: '9 gù / nâng 4 hướng', topDeck: '7 nan (1260×100×18)', support: '9 gù (90×90×107)', bottomDeck: '3 thanh (1260×90×18)', note: 'Kê bao bì & máy móc công nghiệp' },
  { code: 'PTA-G08', name: 'Pallet tràm 9 gù 1170×1080', dimensions: '1170 × 1080 × 140 mm', structure: '9 gù / nâng 4 hướng', topDeck: '8 nan (1170×90×18)', support: '9 gù (90×90×104)', bottomDeck: '3 thanh (1170×90×18)', note: '8 nan mặt chịu tải đồng đều' },
  { code: 'PTA-G09', name: 'Pallet tràm 9 gù 1550×1000', dimensions: '1550 × 1000 × 140 mm', structure: '9 gù / nâng 4 hướng', topDeck: '8 nan (1550×90×18)', support: '9 gù (90×90×104)', bottomDeck: '3 thanh (1550×90×18)', note: 'Khổ dài siêu tải 4 hướng' },
  { code: 'PTA-G10', name: 'Pallet tràm 9 gù 1000×1000', dimensions: '1000 × 1000 × 120 mm', structure: '9 gù / nâng 4 hướng', topDeck: '7 nan (1000×90×17)', support: '9 gù (90×90×86)', bottomDeck: '3 thanh (1000×90×17)', note: 'Vuông 1m×1m đa dụng' },
];

/**
 * 34 quy cách Pallet Ván Ép (Plywood 10mm - 15mm) chuẩn xưởng Pallet Trường An
 */
export const PALLET_PLYWOOD_SPECS: WorkshopSpecRow[] = [
  { code: 'VE-01', name: 'Pallet ván ép 1200×1000×120', dimensions: '1200 × 1000 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1200×1000×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1200×100×12' },
  { code: 'VE-02', name: 'Pallet ván ép 1350×950×120', dimensions: '1350 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1350×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1350×100×12' },
  { code: 'VE-03', name: 'Pallet ván ép 1000×1000×120', dimensions: '1000 × 1000 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1000×1000×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1000×100×12' },
  { code: 'VE-04', name: 'Pallet ván ép 1250×950×120', dimensions: '1250 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1250×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1250×100×12' },
  { code: 'VE-05', name: 'Pallet ván ép 1150×1100×120', dimensions: '1150 × 1100 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1150×1100×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1150×100×12' },
  { code: 'VE-06', name: 'Pallet ván ép 1200×800×120', dimensions: '1200 × 800 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1200×800×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1200×100×12' },
  { code: 'VE-07', name: 'Pallet ván ép 1200×1100×120', dimensions: '1200 × 1100 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1200×1100×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1200×100×12' },
  { code: 'VE-08', name: 'Pallet ván ép 1180×1150×120', dimensions: '1180 × 1150 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1180×1150×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1180×100×12' },
  { code: 'VE-09', name: 'Pallet ván ép 1180×1100×120', dimensions: '1180 × 1100 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1180×1100×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1180×100×12' },
  { code: 'VE-10', name: 'Pallet ván ép 1250×1000×120', dimensions: '1250 × 1000 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1250×1000×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1250×100×12' },
  { code: 'VE-11', name: 'Pallet ván ép 1200×900×120', dimensions: '1200 × 900 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1200×900×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1200×100×12' },
  { code: 'VE-12', name: 'Pallet ván ép 1250×1100×120', dimensions: '1250 × 1100 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1250×1100×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1250×100×12' },
  { code: 'VE-13', name: 'Pallet ván ép 1320×950×120', dimensions: '1320 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1320×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1320×100×12' },
  { code: 'VE-14', name: 'Pallet ván ép 950×950×120', dimensions: '950 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 950×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 950×100×12' },
  { code: 'VE-15', name: 'Pallet ván ép 1300×1100×120', dimensions: '1300 × 1100 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1300×1100×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1300×100×12' },
  { code: 'VE-16', name: 'Pallet ván ép 1100×1050×120', dimensions: '1100 × 1050 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1100×1050×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1100×100×12' },
  { code: 'VE-17', name: 'Pallet ván ép 1180×1050×120', dimensions: '1180 × 1050 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1180×1050×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1180×100×12' },
  { code: 'VE-18', name: 'Pallet ván ép 1150×1150×120', dimensions: '1150 × 1150 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1150×1150×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1150×100×12' },
  { code: 'VE-19', name: 'Pallet ván ép 1250×1050×120', dimensions: '1250 × 1050 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1250×1050×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1250×100×12' },
  { code: 'VE-20', name: 'Pallet ván ép 1150×950×120', dimensions: '1150 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1150×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1150×100×12' },
  { code: 'VE-21', name: 'Pallet ván ép 1100×1100×120', dimensions: '1100 × 1100 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1100×1100×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1100×100×12' },
  { code: 'VE-22', name: 'Pallet ván ép 1200×950×120', dimensions: '1200 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1200×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1200×100×12' },
  { code: 'VE-23', name: 'Pallet ván ép 1180×950×120', dimensions: '1180 × 950 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1180×950×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1180×100×12' },
  { code: 'VE-24', name: 'Pallet ván ép 1100×1000×120', dimensions: '1100 × 1000 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1100×1000×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1100×100×12' },
  { code: 'VE-25', name: 'Pallet ván ép 1150×1050×120', dimensions: '1150 × 1050 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1150×1050×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1150×100×12' },
  { code: 'VE-26', name: 'Pallet ván ép 1150×1000×120', dimensions: '1150 × 1000 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1150×1000×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1150×100×12' },
  { code: 'VE-27', name: 'Pallet ván ép 1250×900×120', dimensions: '1250 × 900 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1250×900×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1250×100×12' },
  { code: 'VE-28', name: 'Pallet ván ép 1150×850×120', dimensions: '1150 × 850 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1150×850×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1150×100×12' },
  { code: 'VE-29', name: 'Pallet ván ép 1050×1050×120', dimensions: '1050 × 1050 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1050×1050×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1050×100×12' },
  { code: 'VE-30', name: 'Pallet ván ép 1250×850×120', dimensions: '1250 × 850 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1250×850×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1250×100×12' },
  { code: 'VE-31', name: 'Pallet ván ép 1200×1050×120', dimensions: '1200 × 1050 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1200×1050×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1200×100×12' },
  { code: 'VE-32', name: 'Pallet ván ép 1050×1000×120', dimensions: '1050 × 1000 × 120 mm', structure: 'Mặt kín 9 gù / 4 hướng', topDeck: '1 tấm 1050×1000×12 + lót 9mm', support: '9 gù 100×100×100', bottomDeck: '3 thanh 1050×100×12' },
  { code: 'VE-33', name: 'Pallet ván ép 1000×760×110 (ván 10mm)', dimensions: '1000 × 760 × 110 mm', structure: 'Mặt kín 9 gù gọn nhẹ', topDeck: '1 tấm 1000×760×10mm', support: '9 gù 80×80×90', bottomDeck: '3 thanh 1000×80×10' },
  { code: 'VE-34', name: 'Pallet ván ép 930×930×126 (ván 15mm)', dimensions: '930 × 930 × 126 mm', structure: 'Mặt dày 15mm + 4 thanh đỡ', topDeck: '1 tấm 930×930×15 + 4 thanh đỡ', support: '5 gù 100×100×90 + 4 gù 140×100×90', bottomDeck: '3 thanh 930×100×15' },
];

/**
 * 7 quy cách Thùng Gỗ Nan Thưa Có Nắp chuẩn xưởng Pallet Trường An (từ sheet Thùng gỗ)
 */
export const THUNG_GO_SPECS: WorkshopSpecRow[] = [
  { code: 'TG-01', name: 'Thùng gỗ 980×680×420 mm', dimensions: '980 × 680 × 420 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 1044 + 4 thanh 744', support: 'Đứng 558 (6 thanh) + Chéo 533/399', bottomDeck: '8 nan mặt 980 + 3 gánh + 9 gù 90×90×90' },
  { code: 'TG-02', name: 'Thùng gỗ 1020×880×960 mm', dimensions: '1020 × 880 × 960 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 1084 + 4 thanh 944', support: 'Đứng 1098 (6 thanh) + Chéo 700/651', bottomDeck: '8 nan mặt 1020 + 3 gánh + 9 gù 90×90×90' },
  { code: 'TG-03', name: 'Thùng gỗ 800×750×580 mm', dimensions: '800 × 750 × 580 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 864 + 4 thanh 814', support: 'Đứng 718 (6 thanh) + Chéo 494/474', bottomDeck: '8 nan mặt 800 + 3 gánh + 9 gù 90×90×90' },
  { code: 'TG-04', name: 'Thùng gỗ 1050×830×900 mm', dimensions: '1050 × 830 × 900 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 1114 + 4 thanh 894', support: 'Đứng 1038 (6 thanh) + Chéo 691/612', bottomDeck: '8 nan mặt 1050 + 3 gánh + 9 gù 90×90×90' },
  { code: 'TG-05', name: 'Thùng gỗ 920×920×410 mm', dimensions: '920 × 920 × 410 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 984 + 4 thanh 984', support: 'Đứng 548 (6 thanh) + Chéo 503.6', bottomDeck: '8 nan mặt 920 + 3 gánh + 9 gù 90×90×90' },
  { code: 'TG-06', name: 'Thùng gỗ 650×570×1000 mm', dimensions: '650 × 570 × 1000 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 714 + 4 thanh 634', support: 'Đứng 1138 (6 thanh) + Chéo 575.3/575.5', bottomDeck: '8 nan mặt 650 + 3 gánh + 9 gù 90×90×90' },
  { code: 'TG-07', name: 'Thùng gỗ 1090×830×570 mm', dimensions: '1090 × 830 × 570 mm', structure: 'Đế 9 gù + vách giằng chéo + nắp', topDeck: 'Nắp: 5 thanh 1154 + 4 thanh 894', support: 'Đứng 708 (6 thanh) + Chéo 615/503.4', bottomDeck: '8 nan mặt 1090 + 3 gánh + 9 gù 90×90×90' },
];
