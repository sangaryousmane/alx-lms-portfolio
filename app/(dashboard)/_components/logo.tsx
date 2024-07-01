import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={130}
        height={130}
      />
    </div>
  );
}