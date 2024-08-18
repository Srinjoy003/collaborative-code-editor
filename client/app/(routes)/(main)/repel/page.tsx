import React from "react";
import { CardWithForm } from "@/app/components/CreateRepel/createrepel";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CardWithForm1 } from "@/app/components/CreateRepel/createrepe1";

export default function RepelPage() {
  return (
    <>
      <div className="header">
        <h1 className="text-6xl font-bold">Create Repel</h1>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
   <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', justifyContent:"center" ,padding:'70px'}}>
          <CardWithForm />
          <CardWithForm1 />
        </div>
      </div>
      <style>
      {`
        @keyframes movingGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .header h1 {
          display: flex;
          justify-content: left;
          padding-left: 70px;
          padding-top: 30px;
          align-items: center;
          font-size: 90px;
          font-weight: 800; 
          background: linear-gradient(90deg, rgba(139,0,139,1) 0%, rgba(255,0,0,1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;

        }
          .history{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50vh
          }
      `}
      </style>
    </>
  );
}
