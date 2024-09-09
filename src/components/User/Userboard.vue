<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">File Explorer</h1>
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
                    <div class="file-explorer">
                      <router-link to="/terms" class="item">
                        <i class="fas fa-folder"></i>
                        <div class="label">Saved Term rates</div>
                      </router-link>
                      <router-link to="/soa"class="item">
                        <i class="fas fa-folder"></i>
                        <div class="label">Statement of Accounts</div>
                      </router-link>
                    </div>
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

<style>
  .file-explorer {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .file-explorer .item {
    width: 100px;
    text-align: center;
    border-radius: 4px; 
    padding: 8px;
  }
  .file-explorer .item i {
    font-size: 36px;
    color: #eeff00;
  }
  .file-explorer .item .label {
    margin-top: 8px;
    font-size: 14px;
    color: #ffffff;
  }
</style>
