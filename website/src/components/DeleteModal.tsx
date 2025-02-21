import { deleteApi } from "@/service/api";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { GoQuestion } from "react-icons/go";

type PropsTypes = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
  url?: string;
};

const DeleteModal: React.FC<PropsTypes> = ({ isOpen, setIsOpen, refetch, url }) => {
  const onCloseModal = () => {
    setIsOpen(false);
    if (refetch) {
      refetch();
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteApi(`${url}`),
    onSuccess: () => {
      toast.success("Deleted Successfully");
      onCloseModal();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10" onClose={onCloseModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-[rgba(0,0,0,.3)] flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 border border-gray-300 max-h-[500px] overflow-y-auto">
            <div>
              <div className="flex justify-center">
                <GoQuestion className="size-14 text-red-600 py-2" />
              </div>
              <p className="text-red-500 py-2 text-center">
                Are you sure you want to delete the course?
              </p>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={onCloseModal}
                  className="bg-gray-color hover:bg-gray-400 font-semibold text-sm px-4 py-1 rounded-md"
                  type="button"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteMutation.mutate()}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 py-1 rounded-md"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteModal;
