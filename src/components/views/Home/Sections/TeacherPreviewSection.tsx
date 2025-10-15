import { ITeacher } from "@/types/Teacher";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  teacher: ITeacher[];
  isLoading: boolean;
}

const TeacherPreviewSection = (props: PropTypes) => {
  const { teacher, isLoading } = props;
  return (
    <section>
      <Card className="mx-4 mb-8 p-6 lg:mx-0">
        <CardHeader className="justify-center">
          <h1 className="flex text-3xl font-bold text-[#006d63]">
            Guru & Pembimbing
          </h1>
        </CardHeader>
        <CardBody>
          <div className="grid auto-cols-[8rem] grid-flow-col gap-4 overflow-x-auto lg:grid-cols-8">
            {!isLoading && Array.isArray(teacher) && teacher.length > 0
              ? teacher?.map((teacher) => (
                  <div
                    key={teacher.teacherName}
                    className="flex flex-col items-center"
                  >
                    <Image
                      src={`${teacher.picture}`}
                      alt="picture"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                      priority
                    />
                    <p className="text-md mt-2 font-bold">
                      {teacher.teacherName}
                    </p>
                    <p className="text-sm font-medium">{teacher.bidang}</p>
                  </div>
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton
                    key={`list-teacher-skeleton-${i}`}
                    className="aspect-square rounded-full"
                  />
                ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default TeacherPreviewSection;
