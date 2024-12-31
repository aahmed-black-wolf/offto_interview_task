import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Counter from "./Counter";
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';

interface RoomsData {
  rooms: number;
  adults: number;
  children: number;
  ageOfChildrens: number;
  infants: number;
}

interface RoomsModalProps {
  data: RoomsData;
  setData: React.Dispatch<React.SetStateAction<RoomsData>>;
  initialData: RoomsData;
}

const RoomsModal: React.FC<RoomsModalProps> = ({ data, setData, initialData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const t = useTranslations('rooms_modal');


  const increment = (key: keyof RoomsData, max = Infinity) => {
    setData((prev) => {
      if (prev[key] < max) {
        return { ...prev, [key]: prev[key] + 1 };
      }
      return prev;
    });
  };

  const decrement = (key: keyof RoomsData, min = 0) => {
    setData((prev) => {
      if (prev[key] > min) {
        return { ...prev, [key]: prev[key] - 1 };
      }
      return prev;
    });
  };

  return (
    <>
      <Button onPress={onOpen} className="w-full transition-colors duration-200 bg-[#f5f5f7] hover:bg-[#dcdcde] p-7">
        <span className="">{t('select_button')}</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-primaryText">{t('header.title')}</span>
                <span className="text-sm text-gray-500 font-normal">{t('header.subtitle')}</span>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Counter
                    label={t('rooms.label')}
                    subLabel={t('rooms.sublabel')}
                    value={data.rooms}
                    onIncrement={() => increment("rooms", 6)}
                    onDecrement={() => decrement("rooms", 1)}
                  />

                  <hr className="my-2 border-gray-300" />

                  <Counter
                    label={t('adult.label')}
                    subLabel={t('adult.sublabel')}
                    value={data.adults}
                    onIncrement={() => increment("adults")}
                    onDecrement={() => decrement("adults", 1)}
                  />

                  <Counter
                    label={t('child.label')}
                    subLabel={t('child.sublabel')}
                    value={data.children}
                    onIncrement={() => increment("children")}
                    onDecrement={() => decrement("children")}
                  />

                  {data.children > 0 && (
                    <Counter
                      label={t('ageOfChildrens.label')}
                      subLabel={t('ageOfChildrens.sublabel')}
                      value={data.ageOfChildrens}
                      onIncrement={() => increment("ageOfChildrens")}
                      onDecrement={() => decrement("ageOfChildrens")}
                    />
                  )}

                  <Counter
                    label={t('infant.label')}
                    subLabel={t('infant.sublabel')}
                    value={data.infants}
                    onIncrement={() => increment("infants")}
                    onDecrement={() => decrement("infants")}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setData(initialData);
                    onClose();
                  }}
                >
                  {t('buttons.reset')}
                </Button>
                <Button className="bg-primaryText text-white" onPress={onClose}>
                  {t('buttons.done')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomsModal;
