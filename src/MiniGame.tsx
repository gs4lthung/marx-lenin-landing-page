import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Tự tạo các component UI đơn giản (không dùng Tailwind)
const Button = ({
    children,
    onClick,
    disabled,
    className,
    style,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        style={{
            padding: '10px 16px',
            borderRadius: '6px',
            margin: '4px',
            backgroundColor: disabled ? '#cccc' : '#4f46e5',
            color: disabled ? '#666' : 'white',
            cursor: disabled ? 'not-allowed' : 'pointer',
            border: 'none',
            ...style, // Thêm dòng này để nhận style động
        }}
        className={className}
    >
        {children}
    </button>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div
        className={className}
        style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '600px',
            minWidth: '500px'
        }}
    >
        {children}
    </div>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} style={{ padding: '20px' }}>{children}</div>
);

// Định nghĩa type cho Question
interface Question {
    question: string;
    options: string[];
    answer: string;
}

// Danh sách câu hỏi gốc
const originalQuestions: Question[] = [
    {
        question: 'Cạnh tranh trong kinh tế thị trường là gì?',
        options: ['Sự thỏa thuận giữa các doanh nghiệp', 'Sự ganh đua giữa các chủ thể kinh tế', 'Sự độc quyền của nhà nước', 'Sự liên kết để tăng giá'],
        answer: 'Sự ganh đua giữa các chủ thể kinh tế',
    },
    {
        question: 'Mục tiêu chính của cạnh tranh là gì?',
        options: ['Tăng thuế', 'Phát triển xã hội', 'Tăng lợi nhuận', 'Giảm giá hàng hóa'],
        answer: 'Tăng lợi nhuận',
    },
    {
        question: 'Có mấy hình thức cạnh tranh chủ yếu?',
        options: ['2', '3', '4', '5'],
        answer: '3',
    },
    {
        question: 'Hình thức cạnh tranh nào mang tính lành mạnh nhất?',
        options: ['Cạnh tranh không hoàn hảo', 'Cạnh tranh hoàn hảo', 'Độc quyền', 'Cartel'],
        answer: 'Cạnh tranh hoàn hảo',
    },
    {
        question: 'Độc quyền là gì?',
        options: ['Sự cạnh tranh mạnh giữa nhiều doanh nghiệp', 'Sự chi phối thị trường bởi 1 hoặc vài doanh nghiệp lớn', 'Sự can thiệp của nhà nước', 'Sự tự do định giá của người tiêu dùng'],
        answer: 'Sự chi phối thị trường bởi 1 hoặc vài doanh nghiệp lớn',
    },
    {
        question: 'Theo Lênin, tư bản tài chính là gì?',
        options: ['Tư bản nông nghiệp', 'Tư bản công nghiệp thuần túy', 'Sự kết hợp ngân hàng và công nghiệp', 'Tư bản nhà nước'],
        answer: 'Sự kết hợp ngân hàng và công nghiệp',
    },
    {
        question: 'Một hình thức tổ chức độc quyền phổ biến là gì?',
        options: ['Hội đồng nhân dân', 'Trust', 'Công đoàn', 'Hợp tác xã'],
        answer: 'Trust',
    },
    {
        question: 'Đặc điểm đầu tiên của chủ nghĩa tư bản độc quyền là gì?',
        options: ['Tăng tiêu dùng', 'Tập trung sản xuất cao', 'Hạn chế nhà nước', 'Suy giảm lợi nhuận'],
        answer: 'Tập trung sản xuất cao',
    },
    {
        question: 'Theo Lênin, chủ nghĩa tư bản độc quyền có bao nhiêu đặc điểm kinh tế?',
        options: ['3', '4', '5', '6'],
        answer: '5',
    },
    {
        question: 'Xuất khẩu tư bản khác gì so với xuất khẩu hàng hóa?',
        options: ['Xuất khẩu lao động', 'Chuyển giao kỹ thuật', 'Đưa vốn ra nước ngoài để thu lợi nhuận', 'Giảm giá hàng xuất khẩu'],
        answer: 'Đưa vốn ra nước ngoài để thu lợi nhuận',
    },
    {
        question: 'Độc quyền nhà nước là gì?',
        options: ['Doanh nghiệp tư nhân chi phối chính phủ', 'Nhà nước hoàn toàn kiểm soát thị trường', 'Kết hợp quyền lực nhà nước và tư bản độc quyền', 'Không có sự quản lý của nhà nước'],
        answer: 'Kết hợp quyền lực nhà nước và tư bản độc quyền',
    },
    {
        question: 'Hệ quả tiêu cực của độc quyền đối với người tiêu dùng là gì?',
        options: ['Giảm giá sản phẩm', 'Cạnh tranh công bằng', 'Tăng chất lượng', 'Tăng giá, giảm chất lượng'],
        answer: 'Tăng giá, giảm chất lượng',
    },
    {
        question: 'Mục tiêu của xuất khẩu tư bản là gì?',
        options: ['Hỗ trợ nước nghèo', 'Tạo liên kết khu vực', 'Thu lợi nhuận từ nước ngoài', 'Tăng dân số lao động'],
        answer: 'Thu lợi nhuận từ nước ngoài',
    },
    {
        question: 'Cạnh tranh có còn tồn tại trong điều kiện độc quyền không?',
        options: ['Không, đã bị loại bỏ hoàn toàn', 'Có, dưới hình thức mới', 'Chỉ còn trong nông nghiệp', 'Chỉ có ở các nước nghèo'],
        answer: 'Có, dưới hình thức mới',
    },
    {
        question: 'Doanh nghiệp nhỏ nên làm gì khi bị doanh nghiệp lớn ép giá?',
        options: ['Từ bỏ thị trường', 'Hợp tác và đổi mới công nghệ', 'Xin trợ cấp', 'Cắt giảm lao động'],
        answer: 'Hợp tác và đổi mới công nghệ',
    },
    {
        question: 'Một ví dụ tiêu biểu của tổ chức độc quyền kiểu cartel là gì?',
        options: ['Liên hợp quốc', 'WTO', 'OPEC', 'UNESCO'],
        answer: 'OPEC',
    },
    {
        question: 'Cạnh tranh không hoàn hảo là gì?',
        options: ['Cạnh tranh trong điều kiện có nhiều người bán', 'Cạnh tranh giữa các cơ quan nhà nước', 'Cạnh tranh với các điều kiện không cân bằng', 'Không có cạnh tranh'],
        answer: 'Cạnh tranh với các điều kiện không cân bằng',
    },
    {
        question: 'Độc quyền làm thị trường bị méo mó như thế nào?',
        options: ['Làm tăng thu nhập cho người nghèo', 'Làm cung vượt cầu', 'Làm giá cả không phản ánh đúng giá trị', 'Làm giảm năng suất lao động'],
        answer: 'Làm giá cả không phản ánh đúng giá trị',
    },
    {
        question: 'Nhà nước can thiệp vào kinh tế tư bản chủ nghĩa nhằm mục tiêu gì?',
        options: ['Tạo độc quyền mới', 'Bảo vệ doanh nghiệp nhà nước', 'Điều tiết, hạn chế bất công xã hội', 'Ngăn cản cạnh tranh'],
        answer: 'Điều tiết, hạn chế bất công xã hội',
    },
    {
        question: 'Đặc điểm nổi bật của chủ nghĩa tư bản hiện đại là gì?',
        options: ['Kinh tế kế hoạch hóa tập trung', 'Tăng trưởng chậm', 'Tư bản nhà nước toàn quyền', 'Độc quyền và xuất khẩu tư bản'],
        answer: 'Độc quyền và xuất khẩu tư bản',
    },
    // {
    //     question: 'Tại sao cạnh tranh lại thúc đẩy sự phát triển kinh tế?',
    //     options: [
    //         'Vì làm tăng thuế nhà nước',
    //         'Vì buộc doanh nghiệp đổi mới và nâng cao chất lượng',
    //         'Vì giúp doanh nghiệp phá sản nhanh hơn',
    //         'Vì ngăn chặn người tiêu dùng lựa chọn nhiều hơn',
    //     ],
    //     answer: 'Vì buộc doanh nghiệp đổi mới và nâng cao chất lượng',
    // },
    // {
    //     question: 'Độc quyền thường dẫn đến điều gì trong thị trường?',
    //     options: [
    //         'Tăng lựa chọn cho người tiêu dùng',
    //         'Giảm chi phí sản xuất cho toàn xã hội',
    //         'Thiếu cạnh tranh và giá cao',
    //         'Tăng tính minh bạch',
    //     ],
    //     answer: 'Thiếu cạnh tranh và giá cao',
    // },
    // {
    //     question: 'Vai trò của nhà nước trong nền kinh tế thị trường định hướng xã hội chủ nghĩa là gì?',
    //     options: [
    //         'Không can thiệp gì vào thị trường',
    //         'Tạo điều kiện cho doanh nghiệp nước ngoài thống trị',
    //         'Điều tiết thị trường, đảm bảo công bằng và ổn định',
    //         'Để mặc cho thị trường tự điều tiết',
    //     ],
    //     answer: 'Điều tiết thị trường, đảm bảo công bằng và ổn định',
    // },
    // {
    //     question: 'Tại sao xuất khẩu tư bản được xem là dấu hiệu của chủ nghĩa tư bản độc quyền?',
    //     options: [
    //         'Vì nó giúp tăng dân số lao động',
    //         'Vì doanh nghiệp muốn chia sẻ lợi nhuận',
    //         'Vì tư bản tìm kiếm lợi nhuận cao hơn ở các nước kém phát triển',
    //         'Vì các nước giàu thiếu nhà đầu tư',
    //     ],
    //     answer: 'Vì tư bản tìm kiếm lợi nhuận cao hơn ở các nước kém phát triển',
    // },
    // {
    //     question: 'Trust là gì trong mô hình tổ chức độc quyền?',
    //     options: [
    //         'Một tổ chức từ thiện',
    //         'Liên minh các doanh nghiệp hoạt động độc lập',
    //         'Sự hợp nhất doanh nghiệp dưới một ban quản lý chung',
    //         'Hiệp hội người tiêu dùng',
    //     ],
    //     answer: 'Sự hợp nhất doanh nghiệp dưới một ban quản lý chung',
    // }
];

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const PuzzleGame = () => {
    // State cho câu hỏi đã xáo trộn
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [revealed, setRevealed] = useState<boolean[]>([]);
    const [completed, setCompleted] = useState(false);
    const [answered, setAnswered] = useState<boolean[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean[]>([]);
    const [showFinishMsg, setShowFinishMsg] = useState(false);
    const [showNotAllRevealedMsg, setShowNotAllRevealedMsg] = useState(false);
    const [gameStarted, setGameStarted] = useState(false); // Thêm state để kiểm soát màn hình mở đầu

    // Âm thanh
    const correctAudio = useRef<HTMLAudioElement | null>(null);
    const wrongAudio = useRef<HTMLAudioElement | null>(null);
    const fireworkAudio = useRef<HTMLAudioElement | null>(null);
    const bgMusicAudio = useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(true);

    // Xáo trộn câu hỏi khi mount
    useEffect(() => {
        const shuffled = shuffleArray(originalQuestions);
        setQuestions(shuffled);
        setRevealed(Array(shuffled.length).fill(false));
        setAnswered(Array(shuffled.length).fill(false));
        setIsCorrect(Array(shuffled.length).fill(false));
        setCurrent(0);
        setSelected(null);
        setCompleted(false);
    }, []);

    // Trigger firework & sound when hoàn thành
    useEffect(() => {
        if (showFinishMsg) {
            fireworkAudio.current?.play();
            // Bắn pháo hoa nhiều lần cho đẹp
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 80,
                        spread: 70 + Math.random() * 30,
                        origin: { y: 0.6 + Math.random() * 0.2 },
                    });
                }, i * 400);
            }
        }
    }, [showFinishMsg]);

    // Tự động phát nhạc nền khi vào game
    useEffect(() => {
        if (isMusicPlaying) {
            bgMusicAudio.current?.play();
        } else {
            bgMusicAudio.current?.pause();
        }
    }, [isMusicPlaying]);

    // Đảm bảo nhạc nền lặp lại và volume nhỏ
    useEffect(() => {
        if (bgMusicAudio.current) {
            bgMusicAudio.current.volume = 0.2;
        }
    }, []);

    // Khi lật hết mảnh ghép (bằng bất kỳ cách nào), tự động hoàn thành game
    useEffect(() => {
        if (revealed.length > 0 && revealed.every(r => r) && !completed) {
            setCompleted(true);
            setShowFinishMsg(true);
        }
    }, [revealed, completed]);

    // Hàm bắt đầu trò chơi
    const startGame = () => {
        setGameStarted(true);
        // Xáo trộn lại câu hỏi khi bắt đầu
        const shuffled = shuffleArray(originalQuestions);
        setQuestions(shuffled);
        setRevealed(Array(shuffled.length).fill(false));
        setAnswered(Array(shuffled.length).fill(false));
        setIsCorrect(Array(shuffled.length).fill(false));
        setCurrent(0);
        setSelected(null);
        setCompleted(false);
        setShowFinishMsg(false);
        setShowNotAllRevealedMsg(false);
    };

    // Xác định index các mảnh viền và mảnh giữa
    const getEdgeIndexes = () => {
        // 5 cột, 4 hàng => 20 mảnh, index 0..19
        const edgeIndexes: number[] = [];
        const innerIndexes: number[] = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 5; col++) {
                const idx = row * 5 + col;
                if (row === 0 || row === 3 || col === 0 || col === 4) {
                    edgeIndexes.push(idx);
                } else {
                    innerIndexes.push(idx);
                }
            }
        }
        return { edgeIndexes, innerIndexes };
    };

    // Khi nhấn Trả lời
    const handleAnswer = () => {
        if (!selected || answered[current]) return;
        const correct = selected === questions[current].answer;
        const newAnswered = [...answered];
        const newIsCorrect = [...isCorrect];
        newAnswered[current] = true;
        newIsCorrect[current] = correct;
        setAnswered(newAnswered);
        setIsCorrect(newIsCorrect);
        if (correct) {
            // Lật ngẫu nhiên một mảnh ghép chưa mở, ưu tiên viền trước
            const { edgeIndexes, innerIndexes } = getEdgeIndexes();
            const unrevealedEdge = edgeIndexes.filter(idx => !revealed[idx]);
            let unrevealedIndexes: number[] = [];
            if (unrevealedEdge.length > 0) {
                unrevealedIndexes = unrevealedEdge;
            } else {
                // Nếu viền đã lật hết, mới lật mảnh giữa
                unrevealedIndexes = innerIndexes.filter(idx => !revealed[idx]);
            }
            if (unrevealedIndexes.length > 0) {
                const randomIdx = unrevealedIndexes[Math.floor(Math.random() * unrevealedIndexes.length)];
                const newRevealed = [...revealed];
                newRevealed[randomIdx] = true;
                setRevealed(newRevealed);
                // Nếu đã mở hết mảnh ghép thì hoàn thành luôn
                if (newRevealed.every(r => r)) {
                    setCompleted(true);
                    setShowFinishMsg(true);
                }
            }
            correctAudio.current?.play();
        } else {
            wrongAudio.current?.play();
        }
        // Không chuyển câu tự động nữa
    };

    // Khi nhấn Câu tiếp
    const handleNext = () => {
        if (current + 1 >= questions.length) {
            // Kiểm tra đã mở hết mảnh ghép chưa
            if (revealed.every((r) => r)) {
                setCompleted(true);
                setShowFinishMsg(true);
                setShowNotAllRevealedMsg(false);
            } else {
                setShowFinishMsg(false);
                setShowNotAllRevealedMsg(true);
            }
        } else {
            setCurrent(current + 1);
            setSelected(null);
        }
    };

    // Hàm reset game
    const resetGame = () => {
        const shuffled = shuffleArray(originalQuestions);
        setQuestions(shuffled);
        setRevealed(Array(shuffled.length).fill(false));
        setAnswered(Array(shuffled.length).fill(false));
        setIsCorrect(Array(shuffled.length).fill(false));
        setCurrent(0);
        setSelected(null);
        setCompleted(false);
        setShowFinishMsg(false);
        setShowNotAllRevealedMsg(false);
    };

    // Hàm lật toàn bộ mảnh ghép
    const revealAll = () => {
        setRevealed(Array(questions.length).fill(true));
    };

    // Màn hình mở đầu
    if (!gameStarted) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px',
                    textAlign: 'center',
                    fontFamily: 'Quicksand, Montserrat, Arial, sans-serif',
                }}
            >
                {/* Nhạc nền mini game */}
                <audio ref={bgMusicAudio} src="/game_music.mp3" loop autoPlay />
                <button
                    onClick={() => setIsMusicPlaying((v) => !v)}
                    style={{
                        position: 'fixed',
                        top: 24,
                        right: 24,
                        zIndex: 100,
                        background: 'rgba(255,255,255,0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                    }}
                    title={isMusicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
                >
                    {isMusicPlaying ? (
                        <span role="img" aria-label="music" style={{ fontSize: 22 }}>🎵</span>
                    ) : (
                        <span role="img" aria-label="muted" style={{ fontSize: 22 }}>🔇</span>
                    )}
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        borderRadius: '28px',
                        padding: '60px 40px',
                        boxShadow: '0 8px 32px rgba(79,70,229,0.10)',
                        maxWidth: '620px',
                        width: '100%',
                    }}
                >
                    <motion.h1
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{
                            fontSize: '2.7rem',
                            fontWeight: 800,
                            color: '#4338ca',
                            marginBottom: '18px',
                            letterSpacing: 1,
                            textShadow: '0 2px 8px rgba(67,56,202,0.08)',
                        }}
                    >
                        🧩 Mảnh Ghép Tư Duy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{
                            fontSize: '1.15rem',
                            color: '#6366f1',
                            marginBottom: '28px',
                            lineHeight: '1.7',
                        }}
                    >
                        Chào mừng bạn đến với trò chơi Mảnh Ghép Tư Duy!<br />
                        Trả lời đúng các câu hỏi về Cạnh tranh và Độc quyền để mở khóa mảnh ghép bí ẩn.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{
                            backgroundColor: '#f3f4f6',
                            padding: '20px',
                            borderRadius: '16px',
                            border: '2px solid #e0e7ff',
                            boxShadow: '0 2px 8px rgba(67,56,202,0.04)',
                        }}>
                            <h3 style={{ color: '#4338ca', marginBottom: '10px', fontWeight: 700 }}>
                                📋 Hướng dẫn chơi:
                            </h3>
                            <ul style={{ textAlign: 'left', color: '#6b7280', lineHeight: '1.6', fontSize: '1rem', paddingLeft: 18 }}>
                                <li> Đọc kỹ câu hỏi và chọn đáp án đúng</li>
                                <li> Mỗi câu trả lời đúng sẽ mở 1 mảnh ghép ngẫu nhiên</li>
                                <li> Hoàn thành tất cả mảnh ghép đoán bí ẩn phía sau để chiến thắng</li>
                                <li> Có thể chơi lại nhiều lần</li>
                            </ul>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.07, boxShadow: '0 4px 16px #6366f1' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={startGame}
                            style={{
                                background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '18px 44px',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(99,102,241,0.13)',
                                transition: 'all 0.3s',
                                marginTop: 10,
                            }}
                        >
                            🚀 Bắt đầu trò chơi
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    if (questions.length === 0) return null;

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e0e7ff 0%, #f3f4f6 100%)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                gap: '48px',
                fontFamily: 'Quicksand, Montserrat, Arial, sans-serif',
            }}
        >
            {/* Nút âm nhạc và lật toàn bộ mảnh ghép fixed góc phải */}
            <div style={{
                position: 'fixed',
                top: 24,
                right: 24,
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}>
                <button
                    onClick={() => setIsMusicPlaying((v) => !v)}
                    style={{
                        background: 'rgba(255,255,255,0.85)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        fontSize: 18,
                    }}
                    title={isMusicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
                >
                    {isMusicPlaying ? (
                        <span role="img" aria-label="music">🎵</span>
                    ) : (
                        <span role="img" aria-label="muted">🔇</span>
                    )}
                </button>
                {/* Nút lật toàn bộ mảnh ghép */}
                {!revealed.every(r => r) && !completed && (
                    <Button
                        onClick={revealAll}
                        style={{
                            backgroundColor: '#818cf8',
                            color: 'white',
                            fontWeight: 500,
                            borderRadius: '50%',
                            fontSize: 18,
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            minHeight: 32,
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px #6366f133',
                            cursor: 'pointer',
                            border: 'none',
                            transition: 'background 0.2s',
                        }}
                        aria-label="Lật toàn bộ mảnh ghép"
                    >
                        👀
                    </Button>
                )}
            </div>
            {/* Âm thanh */}
            <audio ref={bgMusicAudio} src="/game_music.mp3" loop autoPlay />
            <audio ref={correctAudio} src="/correct.mp3" preload="auto" />
            <audio ref={wrongAudio} src="/wrong.mp3" preload="auto" />
            {/* <audio ref={fireworkAudio} src="/public/firework.mp4" preload="auto" /> */}
            {/* Bên trái: Mảnh ghép */}
            <div style={{ position: 'relative', width: '650px', maxWidth: '90vw' }}>
                <img
                    src="/puzzel_backgroung.png"
                    alt="Puzzle background"
                    style={{ width: '100%', borderRadius: '18px', boxShadow: '0 8px 32px rgba(67,56,202,0.10)' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '650px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(4, 1fr)',
                        // gap: '1px',
                        perspective: '1000px',
                    }}
                >
                    {revealed.map((r, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.04, boxShadow: '0 2px 12px #6366f1' }}
                            initial={{ rotateY: 0, opacity: 1 }}
                            animate={{ rotateY: r ? 180 : 0, opacity: r ? 0 : 1 }}
                            transition={{ duration: 0.7 }}
                            style={{
                                opacity: r ? 0 : 1,
                                border: '1.5px solid #c7d2fe',
                                borderRadius: '3px',
                                boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
                                backfaceVisibility: 'hidden',
                                overflow: 'hidden',
                                background: '#e0e7ff',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(/puzzle.jpg)`,
                                    backgroundSize: '500% 400%',
                                    backgroundPosition: `${(i % 5) * 25}% ${(Math.floor(i / 5)) * 25}%`,
                                }}
                            ></div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bên phải: Trả lời câu hỏi */}
            <div>
                <h1 style={{ marginBottom: '18px', fontWeight: 800, fontSize: '2.1rem', color: '#22223b', letterSpacing: 1 }}>Mảnh ghép bí ẩn</h1>
                <Card>
                    <CardContent>
                        {(showFinishMsg || completed) ? (
                            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', color: 'green' }}>
                                🎉 Bạn đã hoàn thành trò chơi Mảnh Ghép Tư Duy!<br />
                                <Button onClick={resetGame} style={{ marginTop: 24, backgroundColor: '#6366f1', color: 'white', borderRadius: 12, fontWeight: 700 }}>Chơi lại</Button>
                            </div>
                        ) : showNotAllRevealedMsg ? (
                            <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>
                                Bạn cần trả lời đúng tất cả các câu để hoàn thành!<br />
                                <Button onClick={resetGame} style={{ marginTop: 24, backgroundColor: '#6366f1', color: 'white', borderRadius: 12, fontWeight: 700 }}>Chơi lại</Button>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#6366f1', marginBottom: 6, letterSpacing: 0.5 }}>Câu {current + 1}:</h2>
                                <p style={{ marginTop: '8px', fontSize: '1.25rem', color: '#22223b', fontWeight: 600, marginBottom: 18 }}>{questions[current].question}</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '10px' }}>
                                    {questions[current].options.map((option: string, idx: number) => {
                                        // Xác định màu sắc cho từng đáp án
                                        let background = '';
                                        let color = '';
                                        let border = '';
                                        let boxShadow = '';
                                        if (answered[current]) {
                                            if (option === questions[current].answer) {
                                                background = '#22c55e'; // xanh lá cho đáp án đúng
                                                color = 'white';
                                                border = '1px solid #ccc';
                                            } else if (selected === option) {
                                                background = '#ef4444'; // đỏ cho đáp án chọn sai
                                                color = 'white';
                                                border = '1px solid #ccc';
                                            } else {
                                                background = '#e5e7eb';
                                                color = '#333';
                                                border = '1px solid #ccc';
                                            }
                                        } else if (selected === option) {
                                            background = '#6366f1'; // tím đậm cho đáp án đang chọn
                                            color = 'white';
                                            border = '1px solid #6366f1';
                                            boxShadow = '0 0 0 3px #a5b4fc';
                                        } else {
                                            background = '#e5e7eb'; // xám nhạt cho đáp án chưa chọn
                                            color = '#333';
                                            border = '1px solid #ccc';
                                        }
                                        return (
                                            <Button
                                                key={idx}
                                                onClick={() => {
                                                    if (!answered[current]) setSelected(option);
                                                }}
                                                disabled={answered[current]}
                                                className={selected === option ? 'selected-option' : ''}
                                                style={{
                                                    backgroundColor: background,
                                                    color: color,
                                                    border: border,
                                                    boxShadow: boxShadow,
                                                    fontWeight: selected === option && !answered[current] ? 'bold' : 'normal',
                                                    fontSize: '1rem',
                                                    borderRadius: 12,
                                                    padding: '14px 10px',
                                                    transition: 'all 0.18s',
                                                    outline: 'none',
                                                }}
                                            >
                                                {option}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <div style={{ textAlign: 'right', marginTop: '22px' }}>
                                    {!answered[current] ? (
                                        <Button onClick={handleAnswer} disabled={!selected}>
                                            Trả lời
                                        </Button>
                                    ) : (
                                        <Button onClick={handleNext}>
                                            {current + 1 >= questions.length ? 'Hoàn thành' : 'Câu tiếp'}
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PuzzleGame;
