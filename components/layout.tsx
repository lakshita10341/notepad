import React, { ReactNode } from "react";
import { Card,  CardBody} from "@nextui-org/react";


interface LayoutProps {
  children: ReactNode;
}
function Layout({children}: LayoutProps) {
  return (
    <Card className="min-h-screen m-auto">
      <CardBody>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <h1 className="title-font font-medium text-3xl text-white">
                Welcome to Notepad!
              </h1>
              <p className="leading-relaxed mt-4 text-white">
               Save your Important notes here
              </p>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              {children}
            </div>
          </div>
        </section>
      </CardBody>
    </Card>
  );
}

export default Layout;
