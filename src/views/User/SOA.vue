<script setup>
import useRedis from "@/composables/redis";
import { computed, onMounted } from "vue";

const { downloadSOA, keys, getKeys } = useRedis();

onMounted(() => {
  getKeys();
});

const SOAFilter = computed(() => {
  const uniqueKeys = new Map();
  
  keys.value
    .filter(key => key.contains === 'soa')
    .forEach(keyItem => {
      if (!uniqueKeys.has(keyItem.key)) {
        uniqueKeys.set(keyItem.key, keyItem);
      }
    });
  return Array.from(uniqueKeys.values());
});
</script>

<template>
  <div class="content-wrapper">

    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">File Explorer</h1>
          </div>

          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/"><i class="fas fa-angle-double-left"></i> Back</router-link></li>
              <li class="breadcrumb-item">Statement of Accounts</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card bg-gradient-dark">
                  <div class="card-body table-responsive p-0" style="height: 650px;">
                    <table class="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          <th>Keys</th>
                          <th>Timestamp</th>
                          <th style="text-align: center;">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="SOAFilter.length === 0">
                          <td colspan="3">Nothing but chickens here.</td>
                        </tr>
                        <tr v-else v-for="(keyItem, index) in SOAFilter" :key="index">
                          <td>{{ keyItem.key }}</td>
                          <td>{{ keyItem.date }}</td>
                          <td style="padding: 0; text-align: center;">
                            <a class="btn btn-app bg-success" @click="downloadSOA(keyItem.key)">
                              <i class="fas fa-download"></i> Download SOA
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

  </div>
</template>