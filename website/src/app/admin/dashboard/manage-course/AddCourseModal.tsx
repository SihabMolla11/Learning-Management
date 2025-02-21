import UploadImage from "@/components/common-components/UploadImage";
import { patch, post } from "@/service/api";
import { API_COURSE } from "@/service/endpoint";
import { createSlug } from "@/utils/util";
import { Dialog, DialogPanel } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { CourseDataType } from "./course.types";

type PropsTypes = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
  editItem?: CourseDataType;
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().typeError("Price must be a number").required("Price is required"),
  course_duration: yup.string().required("Duration is required"),
  start_time: yup.date().required("Start Date is required"),
  end_time: yup.date().required("End Date is required"),
  enrolment_start_date: yup.date().required("Enrolment Start Date is required"),
  enrolment_end_date: yup.date().required("Enrolment End Date is required"),
  thumbnail: yup.string().required("thumbnail is required"),
});

const AddCourseModal: React.FC<PropsTypes> = ({ isOpen, setIsOpen, editItem, refetch }) => {
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      title: editItem?.title ?? null,
      description: editItem?.description ?? null,
      price: editItem?.price ?? null,
      course_duration: editItem?.course_duration ?? null,
      start_time: new Date(editItem?.start_time) ?? null,
      end_time: new Date(editItem?.end_time) ?? null,
      enrolment_start_date: new Date(editItem?.enrolment_start_date) ?? null,
      enrolment_end_date: new Date(editItem?.enrolment_end_date) ?? null,
    },
  });

  const onCloseModal = () => {
    reset();
    setIsOpen(false);
  };

  const createData = useMutation({
    mutationFn: async (data) => await post(API_COURSE.create, data),
    onSuccess: (response) => {
      toast.success("Saved Successfully");
      onCloseModal();
      refetch();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const updateData = useMutation({
    mutationFn: async (data: any) => await patch(`${API_COURSE.update}/${editItem?._id}`, data),
    onSuccess: (response) => {
      toast.success("Saved Successfully");
      onCloseModal();
      refetch();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: CourseDataType) => {
    data.slug = createSlug(data?.title);

    if (editItem?._id) {
      updateData.mutate(data);
      return;
    }

    createData.mutate(data);
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={onCloseModal}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[rgba(0,0,0,.3)] flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 border border-gray-300 max-h-[500px] overflow-y-auto">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="thumbnail"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <UploadImage
                    onAddImage={(imageUrl: string) => field.onChange(imageUrl)}
                    setIsPhotoLoading={setImageUploadLoading}
                    isPhotoLoading={imageUploadLoading}
                    className="w-20 border-2 border-gray-color rounded-md overflow-hidden"
                    {...field}
                  />
                )}
              />

              <p className="text-red-500 text-xs">{errors.thumbnail?.message}</p>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">Title</label>
              <input
                {...register("title")}
                className="input-field border !border-primary !rounded-sm w-full"
                type="text"
              />
              <p className="text-red-500 text-xs">{errors.title?.message}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full">
                <label className="font-semibold text-gray-700 text-sm">Price</label>
                <input
                  {...register("price")}
                  className="input-field border !border-primary !rounded-sm w-full"
                  type="number"
                />
                <p className="text-red-500 text-xs">{errors.price?.message}</p>
              </div>
              <div className="w-full">
                <label className="font-semibold text-gray-700 text-sm">Duration</label>
                <input
                  {...register("course_duration")}
                  className="input-field border !border-primary !rounded-sm w-full"
                  type="text"
                />
                <p className="text-red-500 text-xs">{errors.course_duration?.message}</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full">
                <label className="font-semibold text-gray-700 text-sm">Start Date</label>
                <Controller
                  name="start_time"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      {...field}
                      className="input-field border !border-primary !rounded-sm w-full"
                    />
                  )}
                />
                <p className="text-red-500 text-xs">{errors.start_time?.message}</p>
              </div>
              <div className="w-full">
                <label className="font-semibold text-gray-700 text-sm">End Date</label>
                <Controller
                  name="end_time"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="input-field border !border-primary !rounded-sm w-full"
                    />
                  )}
                />
                <p className="text-red-500 text-xs">{errors.end_time?.message}</p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="w-full">
                <label className="font-semibold text-gray-700 text-sm">Enrolment Start Date</label>
                <Controller
                  name="enrolment_start_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="input-field border !border-primary !rounded-sm w-full"
                    />
                  )}
                />
                <p className="text-red-500 text-xs">{errors.enrolment_start_date?.message}</p>
              </div>
              <div className="w-full">
                <label className="font-semibold text-gray-700 text-sm">Enrolment End Date</label>
                <Controller
                  name="enrolment_end_date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      {...field}
                      className="input-field border !border-primary !rounded-sm w-full"
                    />
                  )}
                />
                <p className="text-red-500 text-xs">{errors.enrolment_end_date?.message}</p>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-sm">Description</label>
              <textarea
                {...register("description")}
                className="input-field border !border-primary !rounded-sm w-full"
              />
              <p className="text-red-500 text-xs">{errors.description?.message}</p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                disabled={createData.isPending}
                className="bg-gray-300 px-4 text-primary text-sm font-medium py-1 hover:bg-gray-400 rounded-md"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button disabled={createData.isPending} className="btn-primary" type="submit">
                {createData.isPending ? "Loading" : "Save"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddCourseModal;
