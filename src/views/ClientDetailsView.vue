<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Информация о контрагенте">
        <span />
      </SectionTitleLineWithButton>
      <CardBox>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ФИО </span>
              <span class="text-lg">
                {{ client?.name }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ИНН </span>
              <span class="text-lg">
                {{ client?.inn }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Тип контрагента </span>
              <span class="text-lg">
                {{ localizeClientType(client?.clientType) }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Email </span>
              <span class="text-lg">
                {{ client?.email ? client.email : "Отсутствует" }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Телефон </span>
              <span class="text-lg">
                {{ client?.phone }}
              </span>
            </div>
          </CardBox>
        </div>
      </CardBox>
      <SectionTitleLineWithButton title="Информация об организациях">
        <span />
      </SectionTitleLineWithButton>
      <CardBox
        v-for="(organization, organizationIndex) in client?.organizations"
      >
        <BaseButton
          class="w-full mb-[10px]"
          color="success"
          label="Изменить данные организации"
          :href="`/editOrganization/${client.id}/${organization.id}`"
          :icon="mdiPen"
        />
        <div class="grid grid-cols-1 gap-6 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Название </span>
              <span class="text-lg">
                {{ organization.name }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ИНН </span>
              <span class="text-lg">
                {{ organization.organizationInn }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> КПП </span>
              <span class="text-lg">
                {{ organization.organizationKpp }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ОГРН </span>
              <span class="text-lg">
                {{ organization.organizationOgrn }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Физический адрес </span>
              <span class="text-lg">
                {{ organization.organizationPhysicalAddress }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Юрдический адрес </span>
              <span class="text-lg">
                {{ organization.organizationJuridicalAddress }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-3 gap-6 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]">
                Должность руководителя
              </span>
              <span class="text-lg">
                {{ organization.ownerPosition }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]">
                Тип налогообложения
              </span>
              <span class="text-lg">
                {{ getTaxesType(organization.taxesTypeId).title }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Ключевая ставка </span>
              <span class="text-lg">
                {{ getTaxesType(organization.taxesTypeId).bid }} %
              </span>
            </div>
          </CardBox>
        </div>
        <SectionTitleLineWithButton title="Информация о налогах">
          <span />
        </SectionTitleLineWithButton>
        <div v-for="(tax, index) in organization.TaxesPayment">
          <div class="grid grid-cols-2 gap-6 mb-6">
            <CardBox>
              <div class="flex flex-col">
                <span class="text-gray-500 text-[13px]">
                  Доход организации
                </span>
                <span class="text-lg"> {{ formatNumber(tax.income) }} ₽ </span>
              </div>
            </CardBox>
            <CardBox>
              <div class="flex flex-col">
                <span class="text-gray-500 text-[13px]"> Доход на момент </span>
                <span class="text-lg">
                  {{ readableDate(tax.paymentDate) }}
                  ({{ defineQuartal(tax.paymentDate) }})
                </span>
              </div>
            </CardBox>
          </div>
          <div class="grid grid-cols-2 gap-6 mb-6">
            <CardBox>
              <div class="flex flex-col">
                <span class="text-gray-500 text-[13px]"> Размер налога </span>
                <span class="text-lg"> {{ formatNumber(tax.mustPay) }} ₽ </span>
              </div>
            </CardBox>
            <CardBox>
              <div class="flex flex-col">
                <span class="text-gray-500 text-[13px]">
                  Заплатить налог до
                </span>
                <span class="text-lg">
                  {{ readableDate(tax.nextPaymentDate) }}
                  ({{ defineQuartal(tax.nextPaymentDate) }})
                </span>
              </div>
            </CardBox>
          </div>
          <div class="grid grid-cols-1 gap-6 mb-6">
            <CardBox>
              <div class="flex flex-col">
                <span class="text-gray-500 text-[13px]"> Оплачен </span>
                <span class="text-lg">
                  {{ isTaxPayed(tax.nextPaymentDate, organizationIndex) }}
                  ({{ defineQuartal(tax.nextPaymentDate) }})
                </span>
              </div>
            </CardBox>
          </div>
          <div class="grid grid-cols-1 gap-6 mb-6">
            <CardBox>
              <div class="flex flex-col">
                <span class="text-gray-500 text-[13px]">
                  {{
                    Number(
                      oweSum(
                        organization.TaxesSuccessPayment,
                        defineQuartal(tax.nextPaymentDate),
                        tax.mustPay
                      )
                    ) > 0
                      ? "Долг"
                      : "Оплачено авансом"
                  }}
                </span>
                <span class="text-lg">
                  {{
                    formatNumber(
                      Number(
                        oweSum(
                          organization.TaxesSuccessPayment,
                          defineQuartal(tax.nextPaymentDate),
                          tax.mustPay
                        )
                      ) > 0
                        ? oweSum(
                            organization.TaxesSuccessPayment,
                            defineQuartal(tax.nextPaymentDate),
                            tax.mustPay
                          )
                        : Number(
                            oweSum(
                              organization.TaxesSuccessPayment,
                              defineQuartal(tax.nextPaymentDate),
                              tax.mustPay
                            )
                          ) * -1
                    )
                  }}
                  ₽
                </span>
              </div>
            </CardBox>
          </div>
        </div>
        <SectionTitleLineWithButton title="Оплаченные налоги">
          <span />
        </SectionTitleLineWithButton>
        <div
          v-for="(tax, index) in organization.TaxesSuccessPayment"
          class="grid grid-cols-2 gap-6 mb-6"
        >
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Оплаченный налог </span>
              <span class="text-lg">
                {{ formatNumber(tax.paymentSum) }} ₽
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Оплачен </span>
              <span class="text-lg">
                {{ readableDate(tax.paymentDate) }}
                ({{ defineQuartal(tax.paymentDate) }})
              </span>
            </div>
          </CardBox>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useClientStore } from "@/stores/clients";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import {
  localizeClientType,
  readableDate,
  getTaxesType,
} from "@/js/helpers/localization";

import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import { SuccessTaxes } from "@/types/clientTypes";
import { mdiPen } from "@mdi/js";

const clientsStore = useClientStore();
const userStore = useUserStore();

onMounted(async () => {
  const router = useRouter();

  const inspectionId = computed(() => {
    return userStore.user.inspectionId;
  });

  const clientId = computed(() => {
    return Number(router.currentRoute.value.params.clientId);
  });

  clientsStore
    .getClientInfo(inspectionId.value, clientId.value)
    .then((resp) => {
      console.log("resp", resp);
    });
});

const client = computed(() => {
  return clientsStore.clients[0];
});

const formatNumber = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const oweSum = (
  successPayments: SuccessTaxes[],
  quartal: string,
  mustPay: string
) => {
  successPayments.filter(
    (payment) => defineQuartal(payment.paymentDate) === quartal
  );
  let payed = 0;
  for (let i = 0; i < successPayments.length; i++) {
    payed += Number(successPayments[i].paymentSum);
  }
  return Number(Number(mustPay) - Number(payed)).toFixed(2);
};

const isTaxPayed = (nextPaymentDate, organizationIndex) => {
  if (!nextPaymentDate || !!organizationIndex) return;
  const payedTaxes =
    clientsStore.clients[0].organizations[organizationIndex]
      .TaxesSuccessPayment;
  for (let i = 0; i < payedTaxes.length; i++) {
    if (
      defineQuartal(payedTaxes[i].paymentDate) ===
      defineQuartal(nextPaymentDate)
    ) {
      return readableDate(payedTaxes[i].paymentDate);
    }
  }
  return "Не Оплачен";
};

const defineQuartal = (paymentDate) => {
  const date = new Date(paymentDate);

  const month = date.getMonth();
  const year = date.getFullYear();

  switch (true) {
    case month <= 2:
      return `Q1-${year}`;
    case month <= 5:
      return `Q2-${year}`;
    case month <= 8:
      return `Q3-${year}`;
    default:
      return `Q4-${year}`;
  }
};

const isClientFound = computed(() => {
  if (!client.value) return false;
  return Object.keys(client.value).length;
});
</script>
