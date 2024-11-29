export const PROFILE_KEY = "user";
export const TOKEN_KEY = "token";
import iconGame1 from '@/assets/images/icons/games/1.png'
import iconGame2 from '@/assets/images/icons/games/2.png'
import iconGame3 from '@/assets/images/icons/games/3.png'
import iconGame4 from '@/assets/images/icons/games/4.png'
import iconGame5 from '@/assets/images/icons/games/5.png'
import iconGame6 from '@/assets/images/icons/games/6.png'
import iconGame7 from '@/assets/images/icons/games/7.png'
import iconGame8 from '@/assets/images/icons/games/8.png'

export const listGame = [
    {
        name: "Keno 5 phút",
        code: "sx5d",
        type: "DICE 1",
        image: iconGame1
    },
    {
        name: "Xố số 2",
        code: "xs2",
        type: "DICE 3",
        image: iconGame2
    },
    {
        name: "Vé số",
        code: "veso",
        type: "DICE 5",
        image: iconGame3
    },
    {
        name: "Phi thuyền",
        code: "mayman",
        type: "KENO 5",
        image: iconGame4
    },
    {
        name: "Nhanh 3",
        code: "nhanh3",
        type: "KENO 3",
        image: iconGame5
    },
    {
        name: "PK đón",
        code: "pkdon",
        type: "KENO 1",
        image: iconGame6
    },
    {
        name: "Vé số",
        code: "veso1",
        type: "BÓNG LỬA 3",
        image: iconGame7
    },
    {
        name: "3D",
        code: "3d",
        type: "BÓNG LỬA 5",
        image: iconGame8
    },
]
function getRandomUsername() {
    const firstNames = ["nguyen", "le", "pham", "tran", "dang", "vo", "bui", "ho", "do"];
    const lastNames = ["vananh", "quangtrung", "thithuy", "minhhoang", "thuylinh", "ngocanh", "hongson", "haianh", "trungkieu"];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName}${randomLastName}`;
}

function getRandomAward() {
    const amounts = [100000, 200000, 150000, 250000, 300000, 50000, 75000, 125000, 175000];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    return `nhận được ưu đãi ${randomAmount.toLocaleString()} USD`;
}

export const userList = Array.from({ length: 100 }, () => ({
    username: getRandomUsername(),
    award: getRandomAward()
}));

export const userRandom = userList[Math.floor(Math.random() * userList.length)];

export const banks = [
    {
        name: "Ngân hàng Thương mại Cổ phần Ngoại thương Việt Nam",
        short_name: "Vietcombank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Công Thương Việt Nam",
        short_name: "VietinBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Đầu tư và Phát triển Việt Nam",
        short_name: "BIDV",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Kỹ Thương Việt Nam",
        short_name: "Techcombank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Á Châu",
        short_name: "ACB",
        type: "Commercial Bank"
    },
    // argibank
    {
        name: "Ngân hàng Thương mại Cổ phần Nông nghiệp và Phát triển Nông thôn Việt Nam",
        short_name: "Agribank",
        type: "Commercial Bank"
    },

    {
        name: "Ngân hàng Thương mại Cổ phần Sài Gòn Thương Tín",
        short_name: "Sacombank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Phát triển Nhà Thành phố Hồ Chí Minh",
        short_name: "HDBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Quân đội",
        short_name: "MB Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Sài Gòn",
        short_name: "SCB",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Việt Nam Thịnh Vượng",
        short_name: "VPBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Quốc tế Việt Nam",
        short_name: "VIB",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Tiên Phong",
        short_name: "TPBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần An Bình",
        short_name: "ABBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Đông Á",
        short_name: "DongA Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Nam Á",
        short_name: "Nam A Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Bưu điện Liên Việt",
        short_name: "LienVietPostBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Sài Gòn Công Thương",
        short_name: "SaigonBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Xuất Nhập khẩu Việt Nam",
        short_name: "Eximbank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Đại chúng Việt Nam",
        short_name: "PVcomBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Bảo Việt",
        short_name: "BaoVietBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Đại Dương",
        short_name: "OceanBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Xây dựng Việt Nam",
        short_name: "CBBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Dầu khí Toàn Cầu",
        short_name: "GPBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Chính sách Xã hội",
        short_name: "VBSP",
        type: "Policy Bank"
    },
    {
        name: "Ngân hàng Phát triển Việt Nam",
        short_name: "VDB",
        type: "Development Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Phương Đông",
        short_name: "OCB",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Bắc Á",
        short_name: "Bac A Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Việt Á",
        short_name: "Viet A Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Việt Nam Thương Tín",
        short_name: "VietBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Bản Việt",
        short_name: "Viet Capital Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Kiên Long",
        short_name: "Kienlongbank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Hàng Hải Việt Nam",
        short_name: "MSB",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Quốc Dân",
        short_name: "NCB",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Việt Nam Thương Tín",
        short_name: "VietBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Nam Việt",
        short_name: "NaviBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Sài Gòn Hà Nội",
        short_name: "SHB",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Đông Nam Á",
        short_name: "SeABank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Liên Việt",
        short_name: "LienVietBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần An Phú",
        short_name: "AnBinh Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Hưng Thịnh",
        short_name: "HungThinhBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Phú Quốc",
        short_name: "PhuQuocBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Sài Gòn - An Bình",
        short_name: "SABBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Phát triển Mê Kông",
        short_name: "Mekong Bank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Nam Đô",
        short_name: "NamDoBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Đệ Nhất",
        short_name: "FirstBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Phương Nam",
        short_name: "SouthernBank",
        type: "Commercial Bank"
    },
    {
        name: "Ngân hàng Thương mại Cổ phần Việt Mỹ",
        short_name: "VietABank",
        type: "Commercial Bank"
    }
];

