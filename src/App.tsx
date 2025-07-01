"use client";

import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion"; // Added for animations

function Model({ onClick, section }: { onClick: () => void; section: number }) {
  const gltf = useGLTF("/bust_of_vladimir_lenin.glb");

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (
          !mesh.material ||
          !Object.prototype.hasOwnProperty.call(
            mesh.material as THREE.Material,
            "color"
          )
        ) {
          // Change color based on section
          const colors = [
            "#ff6b35",
            "#f7931e",
            "#ffd700",
            "#ff4757",
            "#2ed573",
          ];
          mesh.material = new THREE.MeshStandardMaterial({
            color: colors[section % colors.length],
          });
        }
      }
    });

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = box.getSize(new THREE.Vector3());
    console.log("Model size:", size);
  }, [gltf, section]);

  return (
    <Center>
      <primitive
        object={gltf.scene}
        scale={1.8}
        position={[0, -2, 0]}
        onClick={onClick}
      />
    </Center>
  );
}

const sections = [
  {
    id: "intro",
    title: "Độc Quyền",
    subtitle: "Cạnh tranh và độc quyền trong nền kinh tế thị trường",
    background:
      "https://www.tapchicongsan.org.vn/image/journal/article?img_id=96303412&t=1617026158094",
  },
  {
    id: "section-4-1",
    title: "4.1. Cạnh tranh ở cấp độ độc quyền",
    subtitle: "Nghiên cứu về mối quan hệ giữa cạnh tranh và độc quyền",
    content: {
      definition:
        "Độc quyền là liên minh của các doanh nghiệp lớn có khả năng sản xuất và cung ứng một loại hàng hóa nhất định, có thể khống chế thị trường và thu được lợi nhuận độc quyền cao.",
      causes: [
        "Sự phát triển của lực lượng sản xuất ở trình độ cao, ứng dụng khoa học kỹ thuật",
        "Cạnh tranh gay gắt dẫn đến quá trình tích tụ và tập trung sản xuất",
        "Sự phát triển của hệ thống tài chính tín dụng thúc đẩy tích tụ và tập trung sản xuất",
      ],
    },
  },
  {
    id: "section-4-1-1",
    title: "4.1.1. Độc quyền và độc quyền nhà nước",
    subtitle: "Khái niệm và nguyên nhân hình thành",
    content: {
      stateMonopoly:
        "Độc quyền nhà nước là hình thức độc quyền mà nhà nước thiết lập vị trí thống trị của mình trong một số lĩnh vực kinh tế dựa trên quyền lực chính trị.",
      monopolyProfit:
        "Lợi nhuận độc quyền cao thực chất là lao động không công của công nhân làm việc trong xí nghiệp độc quyền",
      monopolyPrice:
        "Giá cả độc quyền là giá do các tổ chức độc quyền đặt ra, cao hơn chi phí sản xuất khi bán và thấp hơn chi phí sản xuất khi mua hàng hóa.",
    },
  },
  {
    id: "section-4-1-2",
    title: "4.1.2. Tác động của độc quyền",
    subtitle: "Tác động tích cực và tiêu cực trong nền kinh tế thị trường",
    content: {
      positive: [
        "Tạo ra khả năng to lớn cho nghiên cứu và phát triển, thúc đẩy tiến bộ khoa học kỹ thuật",
        "Làm tăng năng suất lao động, nâng cao năng lực sản xuất",
        "Thúc đẩy phát triển kinh tế theo hướng quy mô lớn và hiệu quả hơn",
      ],
      negative: [
        "Hạn chế cạnh tranh và gây thiệt hại cho người tiêu dùng và xã hội",
        "Kìm hãm sự tiến bộ khoa học kỹ thuật",
        "Gây ra hiện tượng phân hóa giàu nghèo trong xã hội",
      ],
    },
  },
  {
    id: "section-4-2",
    title: "4.2. Lý luận của V.I. Lênin",
    subtitle: "Đặc điểm kinh tế của độc quyền và độc quyền nhà nước",
    content: {
      intro:
        "V.I. Lênin đã tổng kết những đặc điểm kinh tế cơ bản của độc quyền và độc quyền nhà nước trong chủ nghĩa tư bản vào cuối thế kỷ XIX, đầu thế kỷ XX.",
    },
  },
  {
    id: "section-4-2-1",
    title: "4.2.1. Đặc điểm của độc quyền",
    subtitle: "Theo lý luận của V.I. Lênin",
    content: {
      characteristics: [
        "Tập trung sản xuất và tư bản ở mức độ rất cao tạo ra độc quyền",
        "Tư bản tài chính và bọn đầu sỏ tài chính chi phối",
        "Xuất khẩu tư bản trở thành quan trọng hơn xuất khẩu hàng hóa",
        "Hình thành các liên minh độc quyền quốc tế phân chia thị trường thế giới",
        "Các cường quốc tư bản phân chia lãnh thổ thế giới",
      ],
      forms: [
        "Cartel (Các-ten): Thỏa thuận về giá cả, sản lượng, thị trường",
        "Syndicate (Xanh-đi-ca): Duy trì độc lập sản xuất, mất độc lập thương mại",
        "Trust (Tờ-rớt): Hợp nhất hoàn toàn sản xuất và lưu thông",
        "Consortium (Công-xoóc-xi-om): Hình thức cao nhất của độc quyền",
      ],
    },
  },
  {
    id: "section-4-2-2",
    title: "4.2.2. Độc quyền nhà nước trong tư bản chủ nghĩa",
    subtitle: "Đặc điểm kinh tế theo V.I. Lênin",
    content: {
      characteristics: [
        "Sự kết hợp sức mạnh của các tổ chức độc quyền với sức mạnh của nhà nước",
        "Nhà nước tham gia vào đời sống kinh tế thông qua các hình thức sở hữu",
        "Nhà nước sử dụng các công cụ điều tiết kinh tế",
      ],
      quote:
        "Độc quyền nhà nước trong chủ nghĩa tư bản chẳng qua chỉ là một phương tiện để làm giàu thêm cho các tổ chức độc quyền tư bản, và đồng thời nó cũng là một bộ máy để đàn áp giai cấp công nhân.",
    },
  },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [rotateSpeed] = useState(10);

  const handleModelClick = () => {
    const nextSection = (currentSection + 1) % sections.length;
    setCurrentSection(nextSection);
    setTimeout(() => {
      document.getElementById(sections[nextSection].id)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  };

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    document.getElementById(sections[index].id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <NavigationButton
        sections={sections}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      {sections.map((section, index) => (
        <div
          key={section.id}
          id={section.id}
          style={{
            width: "100%",
            minHeight: "100vh",
            position: "relative",
            backgroundImage:
              index === 0
                ? `url('${section.background}')`
                : `linear-gradient(135deg, #8B0000 0%, #4B0000 100%), url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.1"/%3E%3C/svg%3E')`,
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            {index === 0 ? (
              <>
                <motion.h1
                  className="hero-title"
                  style={{
                    fontSize: "5rem",
                    fontWeight: "900",
                    color: "red",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    textShadow: `2px 2px 0 #000, 4px 4px 10px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.4)`,
                    WebkitTextStroke: "1px black",
                    textAlign: "center",
                    marginBottom: "2rem",
                  }}
                >
                  {section.title}
                </motion.h1>

                <div style={{ height: "60vh", width: "100%" }}>
                  <Canvas camera={{ position: [2, 2, 2] }} shadows>
                    <Environment preset="sunset" />
                    <ambientLight intensity={0.6} />
                    <directionalLight
                      position={[5, 5, 5]}
                      intensity={1.2}
                      color="#ffffff"
                      castShadow
                    />
                    <Suspense
                      fallback={
                        <mesh>
                          <boxGeometry />
                          <meshStandardMaterial color="red" />
                        </mesh>
                      }
                    >
                      <Model
                        onClick={handleModelClick}
                        section={currentSection}
                      />
                    </Suspense>
                    <OrbitControls
                      autoRotate
                      autoRotateSpeed={rotateSpeed}
                      enablePan={false}
                      enableZoom={false}
                    />
                  </Canvas>
                </div>

                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "2.5rem",
                    color: "white",
                    padding: "20px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "10px",
                    marginTop: "2rem",
                  }}
                >
                  {section.subtitle}
                </h2>
              </>
            ) : (
              <div style={{ color: "white", textAlign: "center" }}>
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "#ffd700",
                  }}
                >
                  {section.title}
                </h1>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    color: "#e0e0e0",
                  }}
                >
                  {section.subtitle}
                </h2>

                {section.content && (
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      padding: "2rem",
                      borderRadius: "15px",
                      maxWidth: "800px",
                      margin: "0 auto",
                      textAlign: "left",
                    }}
                  >
                    <ContentRenderer content={section.content} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContentRenderer({ content }: { content: any }) {
  return (
    <div style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
      {content.definition && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Khái niệm:
          </h3>
          <p style={{ color: "#e0e0e0" }}>{content.definition}</p>
        </div>
      )}

      {content.causes && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Nguyên nhân hình thành:
          </h3>
          <ul style={{ color: "#e0e0e0", paddingLeft: "1.5rem" }}>
            {content.causes.map((cause: string, index: number) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.stateMonopoly && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Độc quyền nhà nước:
          </h3>
          <p style={{ color: "#e0e0e0" }}>{content.stateMonopoly}</p>
        </div>
      )}

      {content.monopolyProfit && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Lợi nhuận độc quyền cao:
          </h3>
          <p style={{ color: "#e0e0e0" }}>{content.monopolyProfit}</p>
        </div>
      )}

      {content.monopolyPrice && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Giá cả độc quyền:
          </h3>
          <p style={{ color: "#e0e0e0" }}>{content.monopolyPrice}</p>
        </div>
      )}

      {content.positive && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#2ed573", marginBottom: "0.5rem" }}>
            Tác động tích cực:
          </h3>
          <ul style={{ color: "#e0e0e0", paddingLeft: "1.5rem" }}>
            {content.positive.map((item: string, index: number) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.negative && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ff4757", marginBottom: "0.5rem" }}>
            Tác động tiêu cực:
          </h3>
          <ul style={{ color: "#e0e0e0", paddingLeft: "1.5rem" }}>
            {content.negative.map((item: string, index: number) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.characteristics && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Đặc điểm:
          </h3>
          <ul style={{ color: "#e0e0e0", paddingLeft: "1.5rem" }}>
            {content.characteristics.map((item: string, index: number) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.forms && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
            Các hình thức tổ chức độc quyền:
          </h3>
          <ul style={{ color: "#e0e0e0", paddingLeft: "1.5rem" }}>
            {content.forms.map((form: string, index: number) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {form}
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.quote && (
        <div
          style={{
            backgroundColor: "rgba(255, 215, 0, 0.1)",
            border: "2px solid #ffd700",
            padding: "1rem",
            borderRadius: "10px",
            fontStyle: "italic",
            color: "#ffd700",
            marginTop: "1.5rem",
          }}
        >
          <p>"{content.quote}"</p>
          <p
            style={{
              textAlign: "right",
              marginTop: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            - V.I. Lênin
          </p>
        </div>
      )}

      {content.intro && (
        <p
          style={{ color: "#e0e0e0", fontSize: "1.2rem", textAlign: "center" }}
        >
          {content.intro}
        </p>
      )}
    </div>
  );
}

const NavigationButton = ({
  sections,
  currentSection,
  onSectionChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#ff4757",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "1.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        ☰
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderRadius: "10px",
            padding: "1rem",
            minWidth: "250px",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                onSectionChange(index);
                setIsOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.75rem",
                margin: "0.25rem 0",
                backgroundColor:
                  currentSection === index ? "#ffd700" : "transparent",
                color: currentSection === index ? "#000" : "#fff",
                border: "1px solid #ffd700",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
